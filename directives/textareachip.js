
(function(){
    
var app = angular.module('ForumApp');

app.directive('mdTextareaChips', function($mdUtil, $window, $mdAria, $timeout, $compile) {
    var inputTemplate =
        '<div><div contenteditable="true">' +
        '</div></div>';

    function postLink($scope, $element, $attrs, $ctrls) {
        var chipsTemplates = $attrs.chipsTemplates.split(',');
        var chipsDOM = {};
        var wrapper = $element;
        $element = $element.find('div');

        function setupTextAreaChips() {
            $element.css({
                'border-style': 'solid',
                'position': 'relative',
                'font-size': '16px'
            });

            var setupChipTimeout = 0;

            $element.on('keyup', function (e) {

                $element.parent().find('md-chips').hide();
                clearTimeout(setupChipTimeout);
                setupChipTimeout = setTimeout(function () {
                    setupChips();
                    $scope.$apply(function () {
                        var text = $element.html();
                        ngModelCtrl.$setViewValue(text);
                    });
                    $element.parent().find('md-chips').show();
                }, 350);

            });

            function isChipAtPosition(chipTemplate, chipPosition) {
                var result = -1;
                chipsDOM[chipTemplate].every(function (chipDOM, index) {
                    if (JSON.stringify(chipDOM.position) === JSON.stringify(chipPosition)) {
                        result = index;
                        return false;
                    }
                    return true;
                });

                return result;
            }

            function getTextNodes(element) {
                var nextNode, textNodes = [],
                    walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
                while ((nextNode = walk.nextNode()) !== null) {
                    textNodes.push(nextNode);
                }
                return textNodes;
            }

            function setupChips() {
                chipsTemplates.forEach(function (chipTemplate) {
                    if (angular.isUndefined(chipsDOM[chipTemplate])) {
                        chipsDOM[chipTemplate] = [];
                    }
                    //var selection = window.getSelection();
                    var findChips = new RegExp(chipTemplate.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'), 'g');
                    var textNodes = getTextNodes($element[0]);

                    textNodes.forEach(function (textNode) {
                        var match = null;
                        while ((match = findChips.exec(textNode.textContent)) !== null) {
                            var range = document.createRange();
                            range.collapse(true);
                            range.setStart(textNode, match.index);
                            range.setEnd(textNode, match.index + chipTemplate.length);
                            //range.setEnd(textNode, chipTemplate.length);
                            //selection.removeAllRanges();
                            //selection.addRange(range);
                            var chipPosition = {
                                left: range.getBoundingClientRect().left - wrapper.parent().offset().left,
                                top: range.getBoundingClientRect().top - wrapper.parent().offset().top
                            };
                            //console.log(chipPosition);
                            var chipPositionIndex = isChipAtPosition(chipTemplate, chipPosition);

                            if (chipPositionIndex === -1) {
                                var chipDOM = $compile($('<md-chips style="position:absolute;z-index:99999;pointer-events:none;"><md-chip class="md-focused" style="margin:0;padding-left:2px;padding-right:2px;font-size:16px">' + chipTemplate + '</md-chip></md-chips>'))($scope).appendTo($element.parent()).each(function () {
                                    var dom = $(this);
                                    //console.log(dom);
                                    dom.range = range;
                                    dom.chipPosition = chipPosition;
                                    setTimeout(function () {
                                        var top = Math.ceil(dom.chipPosition.top - (dom.outerHeight() - dom.range.getBoundingClientRect().height) / 2);
                                        var left = Math.ceil(dom.chipPosition.left - (dom.outerWidth() - dom.range.getBoundingClientRect().width) / 2);
                                        dom.css({
                                            top: top,
                                            left: left
                                        });
                                    });
                                });

                                chipsDOM[chipTemplate].push({
                                    position: chipPosition,
                                    dom: chipDOM,
                                    forDelete: false
                                });
                            } else {
                                chipsDOM[chipTemplate][chipPositionIndex].position = chipPosition;
                                chipsDOM[chipTemplate][chipPositionIndex].forDelete = false;
                            }
                        }
                    });
                });

                Object.keys(chipsDOM).every(function (key) {
                    var chipsDomForTemplate = chipsDOM[key];

                    chipsDOM[key] = $.grep(chipsDomForTemplate, function (chipDOM, index) {
                        if (chipDOM.forDelete) {
                            chipDOM.dom.remove();
                            return false;
                        } else {
                            chipsDOM[key][index].forDelete = true;
                            return true;
                        }
                    });
                    return true;
                });
            }

            wrapper.on('mresize', function () {
                console.log('resize');
                setupChips();
            });

            $timeout(function () {
                setupChips();
            }, 1000);
        }

        /**
         * BASIC SETUP FOR INPUT ELEMENT IN ANGULAR MATERIAL
         */
        /*---------------------------*/
        var containerCtrl = $ctrls[0];
        var hasNgModel = !$ctrls[1];
        var ngModelCtrl = $ctrls[1] || $mdUtil.fakeNgModel();
        var isReadonly = angular.isDefined($attrs.readonly);

        /**
         *
         */
        function ngModelPipelineCheckValue(arg) {
            var chipsValid = true;
            Object.keys(chipsDOM).forEach(function (chipTemplate) {
                var chipDOM = chipsDOM[chipTemplate];
                chipsValid = chipsValid && chipDOM.length > 0;
            });
            ngModelCtrl.$setValidity('invalidChips', chipsValid);
            containerCtrl.setHasValue(!ngModelCtrl.$isEmpty(arg));

            return arg;
        }

        function ngModelSettingInitialValue(arg) {
            if (!ngModelCtrl.$isEmpty(arg) && $element.html().length === 0) {
                $element.html(arg);
            }
            return arg;
        }

        function inputCheckValue() {
            // An input's value counts if its length > 0,
            // or if the input's validity state says it has bad input (eg string in a number input)
            containerCtrl.setHasValue($element.text().length > 0 || ($element[0].validity || {}).badInput);
        }

        if (!containerCtrl) {
            return;
        }
        if (containerCtrl.input) {
            throw new Error('<md-input-container> can only have *one* <input>, <textarea>, <md-select> or <md-textarea-chips>  child element!');
        }
        containerCtrl.input = $element;

        if (!containerCtrl.label) {
            $mdAria.expect($element, 'aria-label', $element.attr('placeholder') + ' chips:(' + $attrs.chipsTemplates + ')');
        } else {
            containerCtrl.label.text(containerCtrl.label.text() + ' chips:(' + $attrs.chipsTemplates + ')');
        }

        wrapper.addClass('md-input');
        $element.addClass('md-input');
        if (!$element.attr('id')) {
            $element.attr('id', 'input_' + $mdUtil.nextUid());
        }

        setupTextAreaChips();

        if (!hasNgModel) {
            inputCheckValue();
        }

        var isErrorGetter = containerCtrl.isErrorGetter || function () {
            return ngModelCtrl.$invalid && ngModelCtrl.$touched;
        };
        $scope.$watch(isErrorGetter, containerCtrl.setInvalid);

        ngModelCtrl.$parsers.push(ngModelPipelineCheckValue);
        ngModelCtrl.$formatters.push(ngModelSettingInitialValue);
        ngModelCtrl.$formatters.push(ngModelPipelineCheckValue);

        $element.on('keypress', inputCheckValue);

        if (!isReadonly) {
            $element
                .on('focus', function (ev) {
                    containerCtrl.setFocused(true);
                })
                .on('blur', function (ev) {
                    containerCtrl.setFocused(false);
                    inputCheckValue();
                });

        }

        $scope.$on('$destroy', function () {
            containerCtrl.setFocused(false);
            containerCtrl.setHasValue(false);
            containerCtrl.input = null;
        });

        /*---------------------------*/

    }

    /*
     * JQUERY RESIZE EVENT - MRESIZE 
     */
    $.event.special.mresize = {
        add: function () {
            var el = $(this);
            if (el.data('mresize')) {
                return;
            }
            if (el.css('position') === 'static') {
                el.css('position', 'relative');
            }
            el
                .append('<div class="resize" style="position:absolute; width:auto; height:auto; top:0; right:0; bottom:0; left:0; margin:0; padding:0; overflow:hidden; visibility:hidden; z-index:-1"><iframe style="width:100%; height:0; border:0; visibility:visible; margin:0" /><iframe style="width:0; height:100%; border:0; visibility:visible; margin:0" /></div>')
                .data('mresize', {
                    'w': el.width(),
                    'h': el.height(),
                    t: null
                })
                .find('.resize iframe').each(function () {
                    $(this.contentWindow || this).on('resize', function () {
                        console.log('resize');
                        var d = el.data('mresize');
                        if (d.w !== el.width() || d.h !== el.height()) {
                            if (d.t) {
                                clearTimeout(d.t);
                            }
                            d.t = setTimeout(function () {
                                el.triggerHandler('mresize');
                                d.w = el.width();
                                d.h = el.height();
                            }, 100);
                        }
                    });
                });
        },
        remove: function () {
            $(this).removeData('mresize').find('.resize').remove();
        }
    };
    /*---------------------------*/

    return {
        restrict: 'E',
        replace: true,
        require: ['^?mdInputContainer', '?ngModel'],
        link: postLink,
        template: inputTemplate
    };

  });
    
    
})(angular);
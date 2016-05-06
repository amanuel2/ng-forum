(function(angular) {
    var app = angular.module('ForumApp')

    app.service('encodeImageToBase64', encodeImageToBase64);

    function encodeImageToBase64() {
        
        this.encode = function(document,file,ref,UID) {

            if (file.length > 0) {
                var fileToLoad = file[0];
                var fileReader = new FileReader();

                fileReader.onload = function(fileLoadedEvent) {
                    var srcData = fileLoadedEvent.target.result; // <--- data: base64
                    ref.child("UserAuthInfo").child(UID).update({
                        Image: srcData
                    })
                    return srcData;
                }
                
                fileReader.readAsDataURL(fileToLoad);
            }

        }
        
    }
})(angular);



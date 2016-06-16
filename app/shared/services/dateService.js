(function(angular) {
    var app = angular.module('ForumApp');

    app.service('dateService', dateService)

    function dateService() {
        this.formatDate = function(date) {

            switch (date) {
                case (typeof date != 'object'):
                    return null;
                    break;

                default:
                    var year = date.getFullYear();
                    var month = date.getUTCMonth();
                    var day = date.getUTCDate();

                    //month 2 digits
                    month = ("0" + (month + 1)).slice(-2);

                    //year 2 digits
                    year = year.toString().substr(2, 2);

                    var formattedDate = month + '/' + day + "/" + year;
                      
                      return formattedDate;

            }



        }
    }
})(angular);
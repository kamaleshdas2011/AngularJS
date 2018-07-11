var module = angular.module('app');
var genderFilter = function () {
    return function (input) {
        //debugger;
        if (input == 'M') {
            return 'Male';
        }
        else {
            return 'Female';
        }
    }
}
module.filter('genderFilter', genderFilter);
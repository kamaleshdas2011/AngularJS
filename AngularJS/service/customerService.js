var module = angular.module('app');
var customer = function ($http, $log) {
    var getCustomer = function () {
        return $http.get('http://localhost:58120/api/customers')
            .then((response) => {
                return response.data;
            })
    }
    var getCustomerById = function (id) {
        return $http.get('http://localhost:58120/api/customers/' + id)
            .then((response) => {
                return response.data;
            })
    }
    return {
        getCustomer: getCustomer,
        getCustomerById: getCustomerById,
    }
}
module.factory('customer', customer);
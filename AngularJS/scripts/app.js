// Define the `phonecatApp` module
var app = angular.module('app', ['ui.router','ngAnimate']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/home');
    //$locationProvider.html5Mode(true);
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'view/home/partial-home.html',
            //controller: 'homeController'
        })
        .state('customer', {
            url: '/customer',
            templateUrl: 'view/customer/customer.html',
            controller: 'customerController'
        })
        .state('customerdetails', {
            url: '/customer/:id',
            templateUrl: 'view/customer/customer-details.html',
            controller: 'customerDetailsController'
        })
        .state('addcustomer', {
            url: '/addcustomer',
            templateUrl: 'view/customer/add-customer.html',
            controller:'addCustomerController'
        })
        .state('carshow', {
            url: '/car',
            templateUrl: 'view/cars/car-show.html',
            controller: 'carController'
        })
        .state('topplace', {
            url: '/top/place/:code',
            templateUrl: 'view/top/top-place.html',
            controller: 'topPlaceController'
        })
        .state('admin', {
            url: '/admin',
            templateUrl: 'view/admin/admin.html',
            controller: 'adminController'
        })
        .state('admin.photo', {
            url: '/photo',
            templateUrl: 'view/admin/photo.html',
            controller: 'photoController'
        })
        .state('admin.place', {
            url: '/place',
            templateUrl: 'view/admin/place.html',
            controller: 'placeController'
        })

    //no cache
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    // Answer edited to include suggestions from comments
    // because previous version of code introduced browser-related errors

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';



})



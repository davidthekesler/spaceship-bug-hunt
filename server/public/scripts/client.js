var app = angular.module('SpaceShipApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    console.log('Route config loaded');

    $routeProvider
        .when('/', {
            redirectTo: '/crew'
        })
        .when('/crew', {
            templateUrl: 'views/crew.html',
            controller: 'CrewController as vm'
        })
        .when('/ships', {
            templateUrl: 'views/ships.html',
            controller: 'SpaceShipController as vm'
        })
        .otherwise( { template: '<h1>404</h1>' });
}]);


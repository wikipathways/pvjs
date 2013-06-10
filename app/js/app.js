'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/wpViewer', {templateUrl: 'partials/wpViewer.html', controller: 'PathwayCtrl'});
	$routeProvider.when('/wpEditor', {templateUrl: 'partials/wpEditor.html', controller: 'PathwayCtrl'});
	$routeProvider.when('/widgetViewer', {templateUrl: 'partials/widgetViewer.html', controller: 'PathwayCtrl'});
	$routeProvider.otherwise({redirectTo: '/'});
  }]);

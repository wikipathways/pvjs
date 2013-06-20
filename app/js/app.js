'use strict';

// Declare app level module which depends on filters, and services
angular.module('pathvisio', ['pathvisio.filters', 'pathvisio.services', 'pathvisio.directives', 'pathvisio.controllers', 'ui.bootstrap']).
  config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/wpViewer', {templateUrl: 'index.html', controller: 'PathwayCtrl'});
	$routeProvider.when('/wpEditor', {templateUrl: 'index.html', controller: 'PathwayCtrl'});
	$routeProvider.when('/widgetViewer', {templateUrl: 'partials/widgetViewer.html', controller: 'PathwayCtrl'});
	$routeProvider.when('/', {templateUrl: 'index.html', controller: 'PathwayCtrl'});
	$routeProvider.otherwise({redirectTo: 'error.html'});
  }]);

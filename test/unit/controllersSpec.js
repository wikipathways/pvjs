'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {

	describe('HomeCtrl', function() {

		beforeEach(module('pathvisio.controllers'));

		var ctrl, scope;

		beforeEach(inject(function($controller, $rootScope) {
			scope = $rootScope.$new();
			ctrl = $controller('HomeCtrl', {
				$scope: scope
			});
		}));

		it('get value of scope.test for demo controller test', function() {
			console.log("scope for HomeCtrl");
			console.log(scope);
			console.log(scope.test);

			expect(scope.test).toBe("test");
		});
	});

	describe('PathwayCtrl', function() {

		beforeEach(module('pathvisio.services'));

		beforeEach(module('pathvisio.controllers'));

		var ctrl, scope;

		beforeEach(inject(function($controller, $rootScope) {
			scope = $rootScope.$new();
			ctrl = $controller('PathwayCtrl', {
				$scope: scope,
				Pathway: Pathway
			});
		}));

		it('should create "pathways" model with 1 Pathway', function() {
			console.log("scope for PathwayCtrl");
			console.log(scope);
			console.log(scope.Pathway);

			expect(scope.Pathway.length).toBe(1);
		});
	});
});


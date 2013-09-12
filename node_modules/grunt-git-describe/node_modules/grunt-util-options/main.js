/*
 * grunt-util-options
 * https://github.com/mikaelkaron/grunt-util-process
 *
 * Copyright (c) 2013 Mikael Karon
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
	"use strict";

	var _ = grunt.util._;
	var _property = require("grunt-util-property")(grunt);

	return function (properties) {
		var me = this;
		var name = me.name;
		var target = me.target;

		_.each(_.rest(arguments), function (key) {
			_property.call(properties, key, _.find([
				grunt.option([ name, target, key ].join(".")),
				grunt.option([ name, key ].join(".")),
				grunt.option(key),
				properties[key]
			], function (value) {
				return !_.isUndefined(value);
			}));
		});

		return properties;
	};
}

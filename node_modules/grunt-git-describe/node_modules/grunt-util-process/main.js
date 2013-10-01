/*
 * grunt-util-process
 * https://github.com/mikaelkaron/grunt-util-process
 *
 * Copyright (c) 2013 Mikael Karon
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
	"use strict";

	var _ = grunt.util._;

	return function (options) {
		var me = this;

		_.each(_.rest(arguments), function (key) {
			var value = me[key];

			if (grunt.util.kindOf(value) === "string") {
				me[key] = grunt.template.process(value, options);
			}
		});

		return me;
	};
}
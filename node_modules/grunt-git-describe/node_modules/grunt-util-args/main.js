/*
 * grunt-util-args
 * https://github.com/mikaelkaron/grunt-util-args
 *
 * Copyright (c) 2013 Mikael Karon
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
	"use strict";

	var UNDEFINED;
	var _ = grunt.util._;

	return function () {
		var me = this;
		var args = me.args;
		var result = {};

		_.forEach(arguments, function (key, index) {
			var value;

			if (!_.isEmpty(key)) {
				result[key] = (value = args[index]) === ""
					? UNDEFINED
					: value;
			}
		});

		return result;
	};
}

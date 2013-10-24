/*
 * grunt-util-spawn
 * https://github.com/mikaelkaron/grunt-util-spawn
 *
 * Copyright (c) 2013 Mikael Karon
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
	"use strict";

	var _ = grunt.util._;

	return function (options, doneFunction) {
		grunt.log.verbose.subhead("Spawning");

		if (grunt.option("no-write")) {
			grunt.log.verbose.writeflags(options);
			grunt.log.verbose.writeln("no-write".cyan + " defined, modifying flags");

			_.extend(options, {
				"cmd": "echo",
				"args": [ "test" ]
			});
		}

		grunt.log.verbose.writeflags(options);

		return grunt.util.spawn(options, doneFunction);
	};
}
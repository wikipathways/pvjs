/*
 * Grunt String to JS
 * Copyright (c) 2013 Zach Gohr
 */

var str2js = function(str) {
  return str.replace(/'/g, "\\'").replace(/\r\n|\r|\n/g, "\\n");
};

module.exports = function(grunt) {
  grunt.registerMultiTask('str2js', 'Convert text to JavaScript.', function() {
    var namespace = this.target;
    var str = 'var ' + namespace + ' = ' + namespace + ' || {};\n';

    // Loop over destination files
    for (var fname in this.data) {
      // Loop over source files
      this.data[fname].forEach(function(f) {
        if (!grunt.file.exists(f)) {
          grunt.log.warn('Source file "' + f + '" not found.');
          return false;
        }
        str += namespace + '["' + f + '"] = ';
        str += "'" + str2js(grunt.file.read(f), '') + "';\n";
      });
      grunt.file.write(fname, str);
    }
    
  });
};

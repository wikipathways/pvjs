var gulp = require('gulp');
var modernizr = require("gulp-modernizr");

gulp.task("modernizr", function() {

  gulp.src("./src/pvjs.js")
    .pipe(modernizr({
      "tests" : [
        "inputtypes",
        "svg",
        "svg/asimg",
        "svg/clippaths",
        "svg/filters",
        "svg/foreignobject",
        "svg/inline",
        "svg/smil"
      ]
    }))
    .pipe(gulp.dest("./tmp/"))
});

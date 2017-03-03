var gulp = require('gulp');
var modernizr = require("gulp-modernizr");

gulp.task("modernizr", function() {

  return gulp.src("./lib/main.js")
    .pipe(modernizr({
      "tests" : [
        "inputtypes",
        "svg",
        "inlinesvg",
        "svgasimg",
        "svgclippaths",
        "svgfilters",
        "svgforeignobject",
        "smil"
      ]
    }))
    .pipe(gulp.dest("./tmp/"))
});

/**
 * Created by oswaldo on 7/20/2016.
 */
var gulp = require("gulp");
var jshint = require("gulp-jshint");

gulp.task("default", function () {
    //console.log("hello from gulp");
    return gulp.src("./public/js/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});
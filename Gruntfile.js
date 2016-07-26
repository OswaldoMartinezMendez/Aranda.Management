module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            all: ["./public/js/**/*.js"],
            option: {
                unused: true
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.registerInitTask("default", ["jshint"]);
}
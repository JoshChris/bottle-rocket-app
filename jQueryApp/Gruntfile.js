module.exports = function (grunt) {
    "use strict";
    // Initial Config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        themeName: 'bottleRocketWeb',

        watch: {
            styles: {
                files: [
                    'public/css/source/**/*.scss',
                    'public/css/source/**/**/*.scss'
                ],
                tasks: ['sass'],
                options: {
                    interrupt: true,
                    livereload: true
                }
            }
        },

        sass: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'public/css/source/',
                    src: '*.scss',
                    dest: 'public/css/compiled/',
                    ext: '.css'
                }],
                options: {
                    style: 'expanded',
                    lineNumbers: true,
                    cacheLocation: 'tempcache'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['watch']);

};

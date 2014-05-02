module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        coocoo: {
            compile: {
                src: 'src/**/*.coo',
                dest: {
                    common: 'tmp/coo.js',
                    app: 'js/app.js',
                    debug: false
                }
            }
        },

        conkitty: {
            compile: {
                src: ['src/**/*.ctpl'],
                dest: {
                    common: 'tmp/tplcommon.js',
                    templates: 'js/tpl.js',
                    deps: 'tmp/tpldeps'
                }
            }
        },

        concat: {
            css: {
                src: [
                    'src/**/*.css',
                    'tmp/tpldeps/*.css'
                ],
                dest: 'css/app.css'
            },

            js: {
                src: [
                    'tmp/tplcommon.js',
                    'tmp/tpldeps/*.js',
                    'tmp/coo.js'
                ],
                dest: 'js/deps.js'
            }
        },

        watch: {
            coo: {
                files: ['src/**/*.coo'],
                tasks: ['coocoo']
            },

            ctpl: {
                files: ['src/**/*.ctpl'],
                tasks: ['conkitty', 'concat:js']
            },

            css: {
                files: ['src/**/*.css'],
                tasks: ['concat:css']
            }
        },

        clean: {
            tmp: ['tmp']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-coocoo');
    grunt.loadNpmTasks('grunt-conkitty');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['clean', 'coocoo', 'conkitty', 'concat', 'watch']);
};

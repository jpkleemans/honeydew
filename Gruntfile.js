module.exports = function (grunt) {
    grunt.initConfig({
        typescript: {
            src: {
                src: ['src/**/*.ts'],
                dest: 'build/honeydew.js'
            },
            spec: {
                src: ['spec/**/*.ts'],
                dest: 'build/honeydew.spec.js'
            }
        },
        jasmine: {
            src: ['lib/e_full.js', 'build/json.spec.js'],
            options: {
                specs: 'build/honeydew.spec.js'
            }
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './',
                    keepalive: true
                }
            }
        },
        json: {
            main: {
                options: {
                    namespace: 'json',
                    processName: function (filename) {
                        return filename.toLowerCase();
                    }
                },
                src: ['test/json/*.json'],
                dest: 'build/json.js'
            },
            spec: {
                options: {
                    namespace: 'testjson',
                    processName: function (filename) {
                        return filename.toLowerCase();
                    }
                },
                src: ['spec/json/*.json'],
                dest: 'build/json.spec.js'
            }
        },
        sass: {
            dist: {
                files: {
                    'css/app.css': 'scss/app.scss'
                }
            }
        },
        watch: {
            src: {
                files: 'src/**/*.ts',
                tasks: ['typescript:src']
            },
            spec: {
                files: 'spec/**/*.ts',
                tasks: ['typescript:spec']
            },
            json: {
                files: '**/*.json',
                tasks: ['json']
            }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-json');

    grunt.registerTask('test', ['json:spec', 'typescript:spec', 'jasmine']);
    grunt.registerTask('build', ['json:main', 'typescript:src']);
};

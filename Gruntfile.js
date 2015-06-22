module.exports = function (grunt) {
    grunt.initConfig({
        typescript: {
            src: {
                src: ['src/viewmodels/*.ts', 'src/utilities/*.ts', 'src/controllers/*.ts', 'src/directives/*.ts', 'src/Main.ts'],
                dest: 'build/honeydew.js'
            },
            adapter: {
                src: ['src/Adapter/*.ts'],
                dest: 'build/adapter.js'
            },
            spec: {
                src: ['spec/*.ts'],
                dest: 'build/adapter.spec.js'
            }
        },
        jasmine: {
            src: ['lib/e_full.js', 'build/spec-json.js', 'build/adapter.js'],
            options: {
                specs: 'build/adapter.spec.js'
            }
        },
        watch: {
            ts: {
                files: 'src/**/*.ts',
                tasks: ['typescript']
            },
            json: {
                files: 'test/json/*.json',
                tasks: ['json']
            },
            spec: {
                files: '**/*.ts',
                tasks: ['testsuite']
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
                src: ['spec/json/*.json'],
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
                dest: 'build/spec-json.js'
            }
        },
        sass: {
            dist: {
                files: {
                    'css/app.css': 'scss/app.scss'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-json');
    grunt.registerTask('build', ['typescript']);
    grunt.registerTask('dev', ['build', 'watch']);
    grunt.registerTask('testsuite', ['json:spec', 'typescript:adapter', 'typescript:spec']);
};

module.exports = function (grunt) {
    grunt.initConfig({
        typescript: {
            src: {
                src: ['src/viewmodels/*.ts', 'src/directives/*.ts'],
                dest: 'build/honeydew.js'
            }
        },
        uglify: {
            build: {
                files: {
                    'build/honeydew.min.js': ['build/honeydew.js', 'src/honeydew.js']
                }
            }
        },
        clean: ['build/honeydew.js'],
        watch: {
            files: '**/*.ts',
            tasks: ['typescript']
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['typescript', 'uglify', 'clean']);
};

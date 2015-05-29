module.exports = function(grunt)
{
	grunt.initConfig({
		typescript : {
			src : {
				src : [ 'src/viewmodels/*.ts', 'src/directives/*.ts', 'src/DirectiveFactory.ts' ],
				dest : 'build/honeydew.js'
			}
		},
		uglify : {
			build : {
				files : {
					'build/honeydew.min.js' : [ 'build/honeydew.js', 'src/engine.js', 'src/honeydew.js' ]
				}
			}
		},
		clean : [ 'build/honeydew.js' ],
		watch : {
			files : '**/*.ts',
			tasks : [ 'typescript' ]
		},
		concat : {
			dist : {
				src : [ 'build/honeydew.js', 'src/honeydew.js' ],
				dest : 'dist/built.js'
			}
		}
	});
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('build', [ 'typescript', 'uglify', 'clean' ]);
};

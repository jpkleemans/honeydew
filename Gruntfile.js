module.exports = function(grunt)
{
	grunt.initConfig({
		typescript : {
			src : {
				src : [ 'src/viewmodels/*.ts', 'src/app/*.ts', 'src/directives/*.ts', 'src/DirectiveFactory.ts' ],
				dest : 'build/honeydew.js'
			}
		},
		watch : {
			files : '**/*.ts',
			tasks : [ 'typescript' ]
		},
		concat : {
			dist : {
				src : [ 'build/honeydew.js' ],
				dest : 'dist/built.js'
			}
		},
		connect : {
			server : {
				options : {
					port : 8080,
					base : './',
					keepalive : true
				}
			}
		},
		json : {
			main : {
				options : {
					namespace : 'json',
					processName : function(filename)
					{
						return filename.toLowerCase();
					}
				},
				src : [ 'test/json/*.json' ],
				dest : 'build/json.js'
			}
		}
	});
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-json');
	grunt.registerTask('build', [ 'typescript' ]);
	grunt.registerTask('dev', [ 'json', 'build', 'watch' ]);
};

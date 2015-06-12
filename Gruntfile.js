module.exports = function(grunt)
{
	grunt.initConfig({
		typescript : {
			src : {
				src : [ 'src/viewmodels/*.ts', 'src/utilities/*.ts', 'src/controllers/*.ts', 'src/directives/*.ts', 'src/Main.ts' ],
				dest : 'build/honeydew.js'
			}
		},
		watch : {
			ts : {
				files : 'src/**/*.ts',
				tasks : [ 'typescript' ]
			},
			json : {
				files : 'test/json/*.json',
				tasks : [ 'json' ]
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
				src : [ 'json/*.json' ],
				dest : 'build/json.js'
			}
		}
	});
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-json');
	grunt.registerTask('build', [ 'typescript' ]);
	grunt.registerTask('dev', [ 'build', 'watch' ]);
};

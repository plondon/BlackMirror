module.exports = function(grunt) {
	var ip = grunt.option('ip') || 'localhost';

	grunt.initConfig({
		sass: {
			dev: {
				options: {
					outputStyle: 'expanded'
				},
				files: {
					'css/main.css': 'css/main.scss'
				}
			}
		},

		watch: {
			sass: {
				files: ['css/*.scss', 'css/partials/*.scss'],
				tasks: ['sass:dev']
			}
		},

		requirejs: {
		  compile: {
		    options: {
		      baseUrl: "js",
		      name: "lib/almond",
		      mainConfigFile: "js/main.js",
		      out: "js/build.main.js",
		      done: function(done, output) {
		        var duplicates = require('rjs-build-analysis').duplicates(output);

		        if (Object.keys(duplicates).length > 0) {
		          grunt.log.subhead('Duplicates found in requirejs build:');
		          for (var key in duplicates) {
		            grunt.log.error(duplicates[key] + ": " + key);
		          }
		          return done(new Error('r.js built duplicate modules, please check the excludes option.'));
		        } else {
		          grunt.log.success("No duplicates found!");
		        }

		        done();
		      }
		    }
		  }
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['requirejs']);
};
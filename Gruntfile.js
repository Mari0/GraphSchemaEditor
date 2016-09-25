module.exports = function (grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		requirejs : {
			build : {
				options : {
					baseUrl : "src/js",
					optimize : 'none', //none, uglify
					mainConfigFile : './src/js/config.js',
					name : 'config',
					optimizeCss : 'standard',
					paths : {
						requireLib : './../components/requirejs/require',
						bootstrap : "empty:",
						jquery : "empty:",
						jqueryui: "empty:",
						lodash : "empty:",
						jsonEditor : "empty:",
						text: './../components/text/text',
						tpl: "./../templates",
						vis:"empty:"
					},

					include : 'requireLib',
					logLevel : 0,
					findNestedDependencies : false,
					fileExclusionRegExp : /^\./,
					inlineText : true,
					out : 'dist/gse.js'
				}
			},
			build_with_dep:{
				options: {
					baseUrl: "src/js",
					optimize: 'none', //none, uglify
					mainConfigFile: './src/js/config.js',
					name: 'config',
					optimizeCss: 'standard',
					paths: {
						requireLib: './../components/requirejs/require'
					},
					include: 'requireLib',
					logLevel: 0,
					findNestedDependencies: false,
					fileExclusionRegExp: /^\./,
					inlineText: true,
					out: 'app/gse.js'
				}
			},
			build_min: {
				options: {
					baseUrl: "src/js",
					optimize: 'uglify2', //none, uglify
					mainConfigFile: './src/js/config.js',
					name: 'config',
					paths: {
						requireLib: './../components/requirejs/require',
						bootstrap: "empty:",
						jquery: "empty:",
						jqueryui: "empty:",
						lodash : "empty:",
						jsonEditor : "empty:",
						text: './../components/text/text',
						tpl: "./../templates",
						vis:"empty:"
					},
					//modules : [{
					// name : 'config',
					//exclude: ['./../bower_components/require-css/normalize'],
					// include : 'requireLib'
					// }
					// ],
					include : 'requireLib',
					//exclude : ['./../bower_components/require-css/normalize'],
					logLevel : 0,
					//separateCSS : true,
					findNestedDependencies : false,
					fileExclusionRegExp : /^\./,
					inlineText : true,
					out : 'dist/gse.min.js'
				}
			}
		},
		amdcheck : {
			dev : {
				options : {
					excepts : [],
					exceptsPaths : [],
					removeUnusedDependencies : false,
					logUnusedDependencyNames : true
				},
				files : [{
					src : ['src/js/**/*.js'],
					dest : 'build/'
				}
				]
			}
		},
		connect : {
			devServer : {
				options : {
					port : 8889,
					base : 'src',
					keepalive : true
				}
			},
			server : {
				options : {
					port : 8889,
					base : 'dist',
					keepalive : true
				}
			}
		},
		clean:['dist']
	});

	//Load task
	//grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-amdcheck');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');


};

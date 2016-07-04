requirejs.config({
	baseUrl : "js",
	shim : {
		bootstrap : {
			deps : ['jquery']
		},
        'jqueryui':{
            exports: '$',
            deps:['jquery']
        },
        vis:{
            deps:['css!./../components/vis/dist/vis.min']
        }
	},
	paths : {
		bootstrap : "./../components/bootstrap/dist/js/bootstrap.min",
		jquery : "./../components/jquery/dist/jquery.min",
        jqueryui: "./../components/jquery-ui/jquery-ui.min",
		lodash : "./../components/lodash/dist/lodash.min",
		jsonEditor : "./../components/jsoneditor/dist/jsoneditor.min",
        text: './../components/text/text',
        tpl: "./../templates",
        vis:"./../components/vis/dist/vis.min"
    },
	map : {
		'*' : {
			css : './../components/require-css/css.min'
		}
	}
});
requirejs(['css!../style', 'Main', 'bootstrap']);

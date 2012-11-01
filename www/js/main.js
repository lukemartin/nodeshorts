require.config({
	//baseUrl: 'js',
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'handlebars': {
			exports: 'Handlebars'
		}
	},
	paths: {
		jquery: 'lib/jquery',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',
		bootstrap: 'lib/bootstrap',
		handlebars: 'lib/handlebars',
		text: 'lib/text',
		transitions: 'lib/transitions',
		templates: '../templates'
	},
	urlArgs: 'bust=' + (new Date()).getTime()
});

define(['jquery', 'underscore', 'backbone', 'app', 'bootstrap'], function ($, _, Backbone, App) {

	'use strict';

	var app = new App();
	Backbone.history.start(/*{pushState: true}*/);
	/*
	$('.nav a[href]').live('click', function (e) {
		e.preventDefault();

		app.navigate($(this).attr('href'), true);
	});
	*/
});
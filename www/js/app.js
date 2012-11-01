define([
	'jquery',
	'underscore',
	'backbone',
	'transitions'
], function ($, _, Backbone, Transitions) {

	'use strict';

	var App = Backbone.Router.extend({

		routes: {
			'': 'index'
		},

		initialize: function () {
			console.log('app init');
		},

		index: function () {
			console.log('index init');
		}

	});

	return App;

});
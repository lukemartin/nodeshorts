define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {

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
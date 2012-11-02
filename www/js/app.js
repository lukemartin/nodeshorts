define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {

	'use strict';

	var App = Backbone.Router.extend({

		routes: {
			'':       'index',
			':query': 'bounce'
		},

		initialize: function () {
			console.log('app init');
		},

		index: function () {
			console.log('index init');

			require(['views/shortenForm'], function (ShortenFormView) {
				var shortenFormView = new ShortenFormView();

				$('#content').html(shortenFormView.render().el);
			});
		},

		bounce: function (slug) {
			console.log('bounce init');

			require(['views/bounce'], function (BounceView) {
				var bounceView = new BounceView(slug);

				$('#content').html(bounceView.render().el);
			});
		}

	});

	return App;

});
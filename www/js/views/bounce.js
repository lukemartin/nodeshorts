define([
	'jquery',
	'underscore',
	'backbone',
	'handlebars',
	'text!templates/bounce.html',
	'collections/shorts'
], function ($, _, Backbone, Handlebars, BounceTemplate, Shorts) {

	'use strict';

	var BounceView = Backbone.View.extend({

		initialize: function (slug) {
			console.log('BounceView init');

			// this is probably a terrible idea
			var shorts = new Shorts();
			shorts.url = '/api/shorts/' + slug;
			shorts.fetch({
				data: {},
				success: function (short) {
					if(short.length === 0) {
						window.location = '/';
					}

					window.location = short.at(0).get('url');
				},
				error: function (error) {
					console.log(error);
				}
			})
		},

		render: function () {
			var template = Handlebars.compile(BounceTemplate);

			$(this.el).html(template());

			return this;
		}

	});

	return BounceView;

});
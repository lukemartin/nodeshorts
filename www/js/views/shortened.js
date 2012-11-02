define([
	'jquery',
	'underscore',
	'backbone',
	'handlebars',
	'text!templates/shortened.html',
	'collections/shorts'
], function ($, _, Backbone, Handlebars, shortenedTemplate, Shorts) {

	'use strict';

	var ShortenedView = Backbone.View.extend({

		initialize: function () {
			console.log('ShortenedView init');
		},

		render: function () {
			var template = Handlebars.compile(shortenedTemplate);

			$(this.el).html(template(this.model.toJSON()));

			return this;
		}

	});

	return ShortenedView;

});
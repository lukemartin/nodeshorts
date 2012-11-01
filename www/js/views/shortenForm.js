define([
	'jquery',
	'underscore',
	'backbone',
	'handlebars',
	'text!templates/shortenForm.html'
], function ($, _, Backbone, Handlebars, shortenFormTemplate) {

	'use strict';

	var ShortenFormView = Backbone.View.extend({

		initialize: function () {
			console.log('ShortenFormView init');
		},

		render: function () {
			var template = Handlebars.compile(shortenFormTemplate);

			$(this.el).html(template());

			return this;
		}

	});

	return ShortenFormView;

});
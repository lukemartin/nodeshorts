define([
	'jquery',
	'underscore',
	'backbone',
	'handlebars',
	'text!templates/shortenForm.html'
], function ($, _, Backbone, Handlebars, shortenFormTemplate) {

	'use strict';

	var ShortenFormView = Backbone.View.extend({

		events: {
			'click #shorten': 'shorten'
		},

		initialize: function () {
			console.log('ShortenFormView init');
		},

		render: function () {
			var template = Handlebars.compile(shortenFormTemplate);

			$(this.el).html(template());

			return this;
		},

		shorten: function (e) {
			e.preventDefault();
			
			console.log('shorten clicked');
		}

	});

	return ShortenFormView;

});
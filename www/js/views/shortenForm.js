define([
	'jquery',
	'underscore',
	'backbone',
	'handlebars',
	'text!templates/shortenForm.html',
	'collections/shorts'
], function ($, _, Backbone, Handlebars, shortenFormTemplate, Shorts) {

	'use strict';

	var ShortenFormView = Backbone.View.extend({

		events: {
			'click #shorten': 'shorten'
		},

		initialize: function () {
			console.log('ShortenFormView init');
			this.shorts = new Shorts();
			this.shorts.bind('add', this.shortened, this);
		},

		render: function () {
			var template = Handlebars.compile(shortenFormTemplate);

			$(this.el).html(template());

			return this;
		},

		shorten: function (e) {
			e.preventDefault();
			
			console.log('shorten clicked');

			var url = $('#url').val();

			console.log(url);

			this.shorts.create({
				url: url
			});
		},

		shortened: function (short) {
			require(['views/shortened'], function (ShortenedView) {
				var shortenedView = new ShortenedView({
					model: short
				});

				$('#content').html(shortenedView.render().el);
			});
		}

	});

	return ShortenFormView;

});
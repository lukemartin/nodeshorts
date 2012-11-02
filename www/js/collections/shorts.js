define([
	'underscore',
	'backbone',
	'models/short'
], function (_, Backbone, Short) {

	'use strict';

	var Shorts = Backbone.Collection.extend({
		model: Short,
		url: '/api/shorts',

		initialize: function () {
			//this.fetch();
		}
	});

	return Shorts;

});
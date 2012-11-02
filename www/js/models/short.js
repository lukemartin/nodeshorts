define([
	'underscore',
	'backbone'
], function (_, Backbone) {

	'use strict';

	var Short = Backbone.Model.extend({
		idAttribute: "_id",
		urlRoot: '/api/shorts'
	});

	return Short;

});
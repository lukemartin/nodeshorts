/*global __dirname: true*/

(function () {
	'use strict';

	var application_root = __dirname,
		express = require('express'),
		path = require('path'),
		mongoose = require('mongoose'),
		port = 3001;

	var app = express();

	// Database
	mongoose.connect('mongodb://localhost:27017/nodeshorts');

	// Config
	app.configure(function () {
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(app.router);
		app.use(express.static(path.join(application_root, 'www')));
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
	});

	// Schema
	var Schema = mongoose.Schema;

	var Short = new Schema({
		url:          { type: String, required: true }	
	});

	var ShortModel = mongoose.model('Short', Short);

	// Routes
	app.get('/api', function (req, res) {
		res.send('API is running');
	});

	app.post('/api/shorts', function (req, res) {
		var short;

		console.log(req.body);

		short = new ShortModel({
			url: req.body.url
		});

		short.save(function (error) {
			if (!error) {
				return console.log('created record', short);
			} else {
				return console.log(error);
			}
		});

		return res.end(short);
	});

	app.listen(port);
	console.log('app running on port ', port);

})();
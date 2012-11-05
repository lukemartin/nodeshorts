/*global __dirname: true*/

(function () {
	'use strict';

	var application_root = __dirname,
		express = require('express'),
		path = require('path'),
		mongoose = require('mongoose'),
		fs = require('fs'),
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
		url:           { type: String, required: true, index: {unique: true} },
		slug:          { type: String, required: true, index: {unique: true} },
		visits:        { type: Number, default: 0 },
		unique_visits: { type: Number, default: 0 },
		ips:           { type: Array },
		created:       { type: Date, default: Date.now },
		modified:      { type: Date, default: Date.now }
	});

	Short.path('url').index({unique: true});
	Short.path('slug').index({unique: true});

	var ShortModel = mongoose.model('Short', Short);

	// Routes
	app.get('/:path', function (req, res) {
		fs.exists(__dirname + '/www/' + req.params.path, function (e) {
			if(!e) {
				res.sendfile(__dirname + '/www/index.html');
			} else {
				res.send('boooo')
			}
		});

	});


	app.get('/api', function (req, res) {
		res.send('API is running');
	});


	app.get('/api/shorts/:slug?', function (req, res) {
		return ShortModel.findOne({
			slug: req.params.slug
		}, function (error, short) {
			if (!error) {				
				return res.send(short);
			} else {
				return console.log(error);
			}
		});
	});

	app.post('/api/shorts', function (req, res) {
		var short = new ShortModel({
			url: req.body.url,
			slug: hasher(req.body.url)
		});

		return short.save(function (error) {
			if (!error) {
				return res.send('created record', short);
			} else {
				if (error.code === 11000) {
					return ShortModel.findOne({
						url: req.body.url
					}, function (error, short) {
						if (!error) {
							return res.send(short);
						} else {
							return console.log(error);
						}
					});
				}
				return res.send(error);
			}
		});
	});	

	var hasher = function (URL, length) {
		if (!length) {
			length = 6;
		}

		var AUID = [],
			CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
		
		for (var i = 0; i < length; i = i + 1) {
			AUID.push(CHARS[Math.floor(Math.random() * 62)]);
		}
		
		return AUID.join('');
	};

	app.listen(port);
	console.log('app running on port ', port);

})();
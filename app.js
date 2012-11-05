/*global __dirname: true*/

(function () {
	'use strict';

	var application_root = __dirname,
		express = require('express'),
		path = require('path'),
		mongoose = require('mongoose'),
		fs = require('fs'),
		hbs = require('hbs'),
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

	// Handlebars
	// app.set('view options', { layout: false });
	app.set('views', __dirname + '/views/');
	app.set('view engine', 'html');
	app.engine('html', require('hbs').__express);

	// Routes	
	app.get('/', function (req, res) {
		res.render('blah.html', {name: 'Luke'});
	});
	

	// Hasher
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
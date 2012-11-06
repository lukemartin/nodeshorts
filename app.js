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
	app.get('/:path', function (req, res) {
		console.log(req.params.path);
		if(req.params.path === '' || req.params.path === 'favicon.ico') return;

		fs.exists(__dirname + '/www/' + req.params.path, function (e) {
			if(!e) {
				ShortModel.findOne({
					slug: req.params.path
				}, function (error, short) {
					if (!error) {
						if (short) {
							console.log('hit!');
							console.log(short);

							short.visits++;
							if (short.ips.indexOf(req.ip) === -1) {
								short.ips.push(req.ip);
								short.unique_visits++;
							}

							short.save(function (error) {
								if (!error) {
									res.redirect(short.url);
									res.send('roger');
								} else {
									res.send(error);
								}
							});
							console.log(short);
						} else {
							res.send(404);
						}
					} else {
						res.send('oops');
					}
				});
			} else {
				res.send('boooo')
			}
		});

	});
	app.get('/', function (req, res) {
		res.render('form.html');
	});
	app.post('/', function (req, res) {
		var short = new ShortModel({
			url: req.body.url,
			slug: hasher(req.body.url)
		});

		short.save(function (error) {
			if (!error) {
				render_shortened(res, req, short);
			} else {
				if (error.code === 11000) {
					console.log('already in bro!');
					
					ShortModel.findOne({
						url: req.body.url
					}, function (error, short) {
						if (!error) {
							render_shortened(res, req, short);
						} else {
							res.send('oops');
						}
					});
				} else {
					res.send('oops');
				}
			}
		});
	});
	

	var render_shortened = function (res, req, short) {
		res.render('shortened.html', {
			url: short.url,
			shortened_url: 'http://' + req.header('host') + '/' + short.slug
		});
	}

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
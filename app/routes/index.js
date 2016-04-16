'use strict';

var path = process.cwd();
var StockHandler = require(path + '/app/controllers/stockHandler.server.js');

module.exports = function (app, passport) {

	var stockHandler = new StockHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
/*
	app.route('/api/user/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});
	
	app.route('/api/venue/:id')
		.get(activityHandler.getAttendees, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/api/attendee/:venueId/:userId')
		.post(activityHandler.toggleAttendee, function (req, res) {
			res.json(req.user.github);
		});
		*/
};

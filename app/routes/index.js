'use strict';

var path = process.cwd();
var ActivityHandler = require(path + '/app/controllers/activityHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			return;
		}
	}

	var activityHandler = new ActivityHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});

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
		
	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect : '/', // redirect back to the previous page
        	failureRedirect : '/', // redirect back to the previous page
        	failureFlash : true
		}));
};

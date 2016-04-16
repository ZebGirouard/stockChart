'use strict';

var Stocks = require('../models/stocks.js');

function StockHandler () {
/*
	this.getAttendees = function (req, res) {
		Venues
			.findOne({ venue_id: req.params.id}, 'attendees')
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json(result);
			});
	};

	this.toggleAttendee = function (req, res) {
		Venues
			.findOne({ venue_id: req.params.venueId}, 'attendees')
			.exec(function (err, result) {
				if (err) { throw err; }
				if (!result) {
					var venue = new Venues({ venue_id: req.params.venueId, attendees: [{id: req.params.userId}]});					
					venue.save(function (err, result) {
						if (err) { 
							throw err; 
						}
						res.json(result);
					});					
				}
				else {
					var userIdInAttendees = result.attendees.filter(function(element) {
						return element.id == req.params.userId;
					});	
					if (userIdInAttendees && userIdInAttendees.length == 0) {
						Venues.findOneAndUpdate({ venue_id: req.params.venueId}, { $push: {'attendees': {'id': req.params.userId}}}, {new: true})
						.exec(function (err, result) {
							if (err) { 
								throw err; 
							}
							res.json(result);
						});
					}
					else {
						Venues.findOneAndUpdate({ venue_id: req.params.venueId}, { $pull: {'attendees': {'id': req.params.userId}}}, {new: true})
						.exec(function (err, result) {
							if (err) { 
								throw err; 
							}
							res.json(result);
						});
					}
				}
			});
	};
*/
}

module.exports = StockHandler;

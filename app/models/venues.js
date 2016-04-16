'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Venue = new Schema({
	venue_id: String,
	attendees: Array
});

module.exports = mongoose.model('Venue', Venue);

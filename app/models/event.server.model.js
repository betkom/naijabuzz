'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var EventSchema = new Schema({
	category: {
		type: String,
		default: '',
		required: 'Please fill Event category ,Parties(Club and Street), Seminars, launch events,sports events or church programs',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});
mongoose.model('Event', EventSchema);
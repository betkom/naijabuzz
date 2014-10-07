'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Event Schema
 */
var CommentSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	comment: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	program: {
		type: Schema.ObjectId,
		ref: 'Program'
	}
});

mongoose.model('Comment', CommentSchema);
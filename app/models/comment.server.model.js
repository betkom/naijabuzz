'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	comment: {
		type: String,
		default: '',
		required: 'Pls enter a comment',
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
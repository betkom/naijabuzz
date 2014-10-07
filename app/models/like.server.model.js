'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Like Schema
 */
var LikeSchema = new Schema({
	like: {
		type: Boolean,
		default: '',
		required: 'Please like',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
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

mongoose.model('Like', LikeSchema);
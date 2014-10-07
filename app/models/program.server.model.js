'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Program Schema
 */
var ProgramSchema = new Schema({
	category: {
		type: String,
		default: '',
		required: 'Please fill Program category',
		trim: true
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	location:{
		type: String,
		default: '',
		required: 'Please enter program location',
		trim: true
	},
	programDate:{
		type: String,
		default: '',
		required: 'yyyy/mm/dd'
	}, 
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	likes:[{
		type: Schema.ObjectId,
		ref: 'Like'
	}],
	comments: [{
		type: Schema.ObjectId,
		ref: 'Comment'
	}]
});

mongoose.model('Program', ProgramSchema);
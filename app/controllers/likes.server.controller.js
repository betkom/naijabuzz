'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Like = mongoose.model('Like'),
	_ = require('lodash');

/**
 * Create a Like
 */
exports.create = function(req, res) {
	var like = new Like();
	var program = req.program;
	//like.like +=1;
	like.user = req.user;
	like.program = program;
	program.likes.push(like);

	like.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			program.save(function(err){

				if(!err)
					res.jsonp(like);
				else 
					res.status(400).send({message:errorHandler.getErrorMessage(err)});
			});
		}
	});
};

/**
 * Show the current Like
 */
exports.read = function(req, res) {
	res.jsonp(req.like);
};

/**
 * Update a Like
 */
exports.update = function(req, res) {
	var like = req.like ;

	like = _.extend(like , req.body);

	like.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(like);
		}
	});
};

/**
 * Delete a Like
 */
exports.delete = function(req, res) {
	var like = req.like ;
	var program = req.program;

	var index = program.likes.indexOf(like._id);
	
	if(index>-1)
		program.likes.splice(index,1);
	

	like.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			program.save(function(err){
				if(err)
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				else
					res.jsonp(like);
			});
			
		}
	});
};

/**
 * List of Likes
 */
exports.list = function(req, res) { Like.find({program:req.program}).sort('-created').populate('user', 'displayName').exec(function(err, likes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(likes);
		}
	});
};

/**
 * Like middleware
 */
exports.likeByID = function(req, res, next, id) { Like.findById(id).populate('user', 'displayName').exec(function(err, like) {
		if (err) return next(err);
		if (! like) return next(new Error('Failed to load Like ' + id));
		req.like = like ;
		next();
	});
};

/**
 * Like authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.like.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
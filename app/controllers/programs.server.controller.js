'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Program = mongoose.model('Program'),
	Comment = mongoose.model('Comment'),
	Like = mongoose.model('Like'),
	_ = require('lodash');

/**
 * Create a Program
 */
exports.create = function(req, res) {

	var program = new Program(req.body);


	program.user = req.user;

	program.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(program);
		}
	});
};

/**
 * Show the current Program
 */
exports.read = function(req, res) {
	if(req.user)
	{
		Like.find({user:req.user,program:req.program}).populate('user','_id').exec(function(err,like){
			if(!err)
			{
				var response = {program:req.program,userlike:like.length>0?like:false};
				console.log(response);
				res.jsonp(response);
			}
		});
	}
	else
		res.jsonp({program:req.program,userlike:null});
};



/**
 * Update a Program
 */
exports.update = function(req, res) {
	var program = req.program ;

	program = _.extend(program , req.body);

	program.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(program);
		}
	});
};

/**
 * Delete an Program
 */
exports.delete = function(req, res) {
	var program = req.program ;

	program.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(program);
		}
	});
};

/**
 * List of Programs
 */
exports.list = function(req, res) { Program.find().sort('-created').populate('user', 'displayName').exec(function(err, programs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(programs);	
		}
	});
};
// exports.like = function(req,res,next){
// 	req.program.like(function(err, program){
// 		res.json(program);
// 	});
// };
exports.search = function(req,res){	
	console.log(req.query);
	var $or = {$or:[]};
	var checkQuery = function(){
		if (req.query.location && req.query.location.length >0){
			$or.$or.push({location : new RegExp(req.query.location, 'i')});
		}
		if (req.query.category && req.query.category.length > 1){
			$or.$or.push({category: new RegExp(req.query.category, 'i')});
		}
		if(req.query.programDate && req.query.programDate.length>1)
		{
			$or.$or.push({programDate:new RegExp(req.query.programDate)});
		}
	};
	checkQuery();
	Program.find($or).exec(function(err, programs){
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log(programs);
			res.jsonp(programs);
			//console.log(req.body);
		}
	});
};

/**
 * Program middleware
 */
exports.programByID = function(req, res, next, id) { Program.findById(id).populate('user','displayName').exec(function(err, program) {
		if (err) return next(err);
		if (! program) return next(new Error('Failed to load Program ' + id));
		req.program = program ;
		next();
	});
};

/**
 * Program authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.program.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
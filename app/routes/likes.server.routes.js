'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var programs = require('../../app/controllers/programs');
	var likes = require('../../app/controllers/likes');

	// Likes Routes
	app.route('/programs/:programId/likes')
		.get(likes.list)
		.put(users.requiresLogin, likes.create);

	app.route('/programs/:programId/likes/:likeId')
		.get(likes.read)
		.put(users.requiresLogin, likes.hasAuthorization, likes.update)
		.delete(users.requiresLogin, likes.hasAuthorization, likes.delete);

	// Finish by binding the Like middleware
	app.param('likeId', likes.likeByID);
};
'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var programs = require('../../app/controllers/programs');
	var comments = require('../../app/controllers/comments');

	// Events Routes
	app.route('/programs/:programId/comments')
		.get(comments.list)
		.post(users.requiresLogin, comments.create);

	app.route('/programs/:programId/comments/:commentId')
		.get(comments.read)
		.put(users.requiresLogin, comments.hasAuthorization, comments.update);
		// .delete(users.requiresLogin, events.hasAuthorization, events.delete);

	// Finish by binding the Comment middleware
	app.param('commentId', comments.commentByID);
};
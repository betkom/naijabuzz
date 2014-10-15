'use strict';

module.exports = {
	db: 'mongodb://localhost/naijabuzz-dev',
	app: {
		title: 'NaijaBuzz - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '753974291361459',
		clientSecret: process.env.FACEBOOK_SECRET || '44b77a1cbf05d90444febfa6fb7b7872',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'bNSI59ui1w640vAB4HxcVUQZlY',
		clientSecret: process.env.TWITTER_SECRET || 'btFyBI6xK8U1X5Ef9XvB36frYadXHAvvJa8aCXbXQoO2NCTTBx',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
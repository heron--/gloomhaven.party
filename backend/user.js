const express = require('express');
const config = require('config');
const Cryptr = require('cryptr');
const utils = require('./utils');
const User =  require('./models/User');
	
const encryptionConfig = config.get('encryptionConfig');
const cryptr = new Cryptr(encryptionConfig.secret);

const {
	getResponseMessage,
	getLoginErrorMessage,
	getUserCharacters
} = new utils();

const router = express.Router({
	mergeParams: true
});

router.get('/check-session', (req, res) => {

	// Cookie not set
	if(typeof req.gloomhavensession === 'undefined') {

		res.send(getResponseMessage(res, 'User not logged in', 200, null));

	} else {

		// Cookie set but session not started
		if(typeof req.gloomhavensession.user === 'undefined') {

			res.send(getResponseMessage(res, 'User not logged in', 200, null));

		// Everything's good
		} else {

			getUserCharacters(req, res);

		}

	}
});

router.get('/activate', (req, res) => {
	if(typeof req.gloomhavensession.user === 'undefined') {

		res.send(getLoginErrorMessage(res));

	} else {
		
		req.getConnection((error, connection) => {

			if(error) return next(error);

			const user = new User(req.gloomhavensession.user.email);

			const encryptedEmail = cryptr.encrypt(user.get().email);

			connection.query('UPDATE Users AS u SET u.active=1 WHERE u.email=?', [encryptedEmail], (error, results) => {

				if(error) return next(error);

				console.log('Account activated');
				res.send(getResponseMessage(res, 'Account activated', 200, null));
			});

		});

	}
});

router.get('/deactivate', (req, res) => {
	if(typeof req.gloomhavensession.user === 'undefined') {

		res.send(getLoginErrorMessage(res));

	} else {
		
		req.getConnection((error, connection) => {

			if(error) return next(error);

			const user = new User(req.gloomhavensession.user.email);

			const encryptedEmail = cryptr.encrypt(user.get().email);

			connection.query('UPDATE Users AS u SET u.active=0 WHERE u.email=?', [encryptedEmail], (error, results) => {

				if(error) return next(error);

				console.log('Account deactivated');
				res.send(getResponseMessage(res, 'Account activated', 200, null));
			});

		});

	}
});

module.exports = router;
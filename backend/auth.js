const express = require('express');
const fetch = require('node-fetch');
const GoogleAuth = require('google-auth-library');
const config = require('config');
const Cryptr = require('cryptr');
const utils = require('./utils');
const User =  require('./models/User');

const googleConfig = config.get('googleConfig');
const googleAuth = new GoogleAuth;
const googleClient = new googleAuth.OAuth2(googleConfig.clientId, '', '');
	
const encryptionConfig = config.get('encryptionConfig');
const cryptr = new Cryptr(encryptionConfig.secret);

const {
	getResponseMessage
} = new utils();

const router = express.Router({
	mergeParams: true
});

router.post('/login', verifyUser, checkUserExists, (req, res) => {
	res.send(getResponseMessage(res, 'Login successful', 200, {
		user: req.gloomhavensession.user
	}));
});

router.get('/logout', (req, res) => {
	req.gloomhavensession.reset(); 
	res.send(getResponseMessage('User session terminated', 200, null));
});

function verifyUser(req, res, next) {
	if(typeof req.body.type !== 'undefined') {

		if(req.body.type === 'google') {
			verifyGoogle(req, res, next);
		}

	} else {

		res.send(getResponseMessage(res, 'Error validating user', 401, null));

	}
}

function verifyGoogle(req, res, next) {

	const token = req.body.authData.id_token;

	googleClient.verifyIdToken(token, googleConfig.clientId, (err, login) => {

		if(err) throw err;

		const payload = login.getPayload();

		if(payload.email_verified) {
			req.gloomhavensession.reset();
			res.user = new User(payload.email);
			next();	
		}
	});
}

function checkUserExists(req, res, next) {
	// Check if the user exists in the DB. If not, create it
	req.getConnection((error, connection) => {
		
		if(error) return next(error);	

		const user = res.user;

		const encryptedEmail = cryptr.encrypt(user.get().email);

		connection.query('SELECT * FROM Users AS U WHERE U.email', [encryptedEmail], (error, results) => {

			if(error) return next(error);

			if(results.length > 0) {

				// User exists, continue
				console.log('User exists');
				req.gloomhavensession.user = user.get();
				next();

			} else {

				// User does not exist, insert into table
				console.log('User does not exist');
				connection.query('INSERT INTO Users (email) VALUES (?)', [encryptedEmail], (error, results) => {

					if(error) return next(error);

					user.setFirstSession(true);
					req.gloomhavensession.user = user.get();

					next();
				});
			}
		});
	});
}

module.exports = router;
const express = require('express');
const fetch = require('node-fetch');
const GoogleAuth = require('google-auth-library');
const config = require('config');
const utils = require('./utils');

const googleConfig = config.get('googleConfig');
const googleAuth = new GoogleAuth;
const googleClient = new googleAuth.OAuth2(googleConfig.clientId, '', '');

const {
	getResponseMessage
} = new utils();

const router = express.Router({
	mergeParams: true
});

router.post('/login', verifyUser, (req, res) => {
	res.send(getResponseMessage(res, 'Login successful', 200, null));
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
			req.gloomhavensession.email = payload.email;
			next();	
		}
	});
}

module.exports = router;
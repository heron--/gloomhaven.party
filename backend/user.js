const express = require('express');
const helpers = require('./helpers');

const {
	getResponseMessage
} = helpers;

const router = express.Router({
	mergeParams: true
});

router.get('/', (req, res) => {

	if(typeof req.gloomhavensession.user === 'undefined') {

		res.status(403)
		.send(getResponseMessage('User not logged in', 403, null));
	}

	const user = req.gloomhavensession.user;
	res.send(getResponseMessage('User data', 200, { user }));
});

router.post('/login', verifyUser, (req, res) => {
	req.gloomhavensession.user = 'test';
	res.send(getResponseMessage('Login successful', 200, null));
});

router.get('/logout', (req, res) => {
	req.gloomhavensession.reset(); 
	res.send(getResponseMessage('User session terminated', 200, null));
});

function verifyUser(req, res, next) {
	console.log(req.body.user);
	next();
};

module.exports = router;
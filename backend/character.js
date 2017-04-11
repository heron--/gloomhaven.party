const express = require('express');
const config = require('config');
const Cryptr = require('cryptr');
const utils = require('./utils');
const CharacterClass =  require('./models/CharacterClass');
	
const encryptionConfig = config.get('encryptionConfig');
const cryptr = new Cryptr(encryptionConfig.secret);

const {
	getResponseMessage,
	getLoginErrorMessage
} = new utils();

const router = express.Router({
	mergeParams: true
});

router.get('/classes', (req, res) => {
	req.getConnection((error, connection) => {

		if(error) return next(error);

		connection.query('SELECT * FROM `CharacterClasses`', (error, results) => {

			if(error) return next(error);

			res.send(getResponseMessage(res, 'Return character classes', 200, results.map(r => new CharacterClass(r.id, r.displayName).get())));
		});

	});
});

module.exports = router;
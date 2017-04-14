const express = require('express');
const config = require('config');
const Cryptr = require('cryptr');
const utils = require('./utils');
const CharacterClass =  require('./models/CharacterClass');
const Character =  require('./models/Character');
	
const encryptionConfig = config.get('encryptionConfig');
const cryptr = new Cryptr(encryptionConfig.secret);

const {
	getResponseMessage,
	getLoginErrorMessage
} = new utils();

const router = express.Router({
	mergeParams: true
});

router.get('/classes', (req, res, next) => {
	req.getConnection((error, connection) => {

		if(error) return next(error);

		const selectQuery = 'SELECT cc.id, cc.displayName, cc.spoiler, p.description AS perkDescription, p.id AS perkId FROM `CharacterClasses` AS cc JOIN `Perks` AS p ON p.characterClassId = cc.id';

		connection.query(selectQuery, (error, results) => {

			if(error) return next(error);

			const characterClasses = [];

			results.forEach(r => {
		
				const characterClass = characterClasses.filter(cc => cc.id === r.id)[0];

				if(typeof characterClass === 'undefined') {

					characterClasses.push(new CharacterClass(r.id, r.displayName, !!r.spoiler).addPerk(r.perkDescription, r.perkId));

				} else {

					characterClass.addPerk(r.perkDescription, r.perkId);

				}
			});

			res.send(getResponseMessage(res, 'Return character classes', 200, characterClasses.map(c => c.get())));
		});

	});
});

router.get('/:characterId', (req, res) => {
	// Cookie not set
	if(typeof req.gloomhavensession === 'undefined') {

		res.send(getResponseMessage(res, 'User not logged in', 200, null));

	} else {

		// Cookie set but session not started
		if(typeof req.gloomhavensession.user === 'undefined') {

			res.send(getResponseMessage(res, 'User not logged in', 200, null));

		// Everything's good
		} else {

			req.getConnection((error, connection) => {

				if(error) return next(error);

				const characterId = cryptr.decrypt(req.params.characterId);

				connection.query('SELECT * FROM `Characters` AS c WHERE c.id = ?', [characterId], (error, results) => {

					if(error) return next(error);

					const r = results[0];

					const character = new Character(
						r.id,
						r.classId,
						r.name,
						r.level,
						r.experienceNotes,
						r.goldNotes,
						r.items,
						r.checks,
						r.notes,
						r.retired
					);

					res.send(getResponseMessage(res, 'Fetch Character', 200, character.get()));
				});

			});


		}

	}
});

module.exports = router;
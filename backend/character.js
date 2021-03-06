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

				connection.query('SELECT c.*, uc.userId FROM `Characters` AS c JOIN `User-Character` AS uc WHERE uc.characterId = ? AND c.id = ?', [characterId, characterId], (error, results) => {

					if(error) return next(error);

					const r = results[0];

					connection.query('SELECT * FROM `Character-Perk` AS cp WHERE cp.characterId = ?', [characterId], (error, results) => {

						if(error) return next(error);

						const perks = results[0];

						if(typeof r !== 'undefined') {
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
								r.retired,
								perks
							);

							res.send(getResponseMessage(res, 'Fetch Character', 200, character.get()));

						} else {

							res.send(getResponseMessage(res, 'Character not found', 404, null));

						}
					});
				});

			});


		}

	}
});

router.post('/:characterId', (req, res, next) => {

	req.getConnection((error, connection) => {
		const encryptedEmail = cryptr.encrypt(req.gloomhavensession.user.email);

		// Get current User
		connection.query('SELECT * FROM `Users` AS u WHERE u.email=?', [encryptedEmail], (error, results) => {

			if(error) return next(error);

			const user = results[0];

			const decryptedCharacterId = cryptr.decrypt(req.params.characterId);

			// Get current Character
			connection.query('SELECT c.*, uc.userId FROM `Characters` AS c JOIN `User-Character` AS uc WHERE uc.characterId = ? AND c.id = ?', [decryptedCharacterId, decryptedCharacterId], (error, results) => {
					
				if(error) return next(error);

				if(results.length === 0) {

					res.send(getResponseMessage(res, 'Character not found', 404, null));
					next();

				} else {

					const character = results[0];

					if(character.userId !== user.id) {
						res.send(getResponseMessage(res, 'Verfied user does not own this character', 401, null));	
						next();
					}

					const updateQuery = 'UPDATE `Characters` AS c SET c.name=?, c.level=?, c.experienceNotes=?, c.goldNotes=?, c.items=?, c.checks=?, c.notes=? WHERE c.id=?';

					const updateObject = Object.assign({}, character, req.body.character);

					const updateParams = [
						updateObject.name,
						updateObject.level,
						updateObject.experienceNotes,
						updateObject.goldNotes,
						updateObject.items,
						updateObject.checks,
						updateObject.notes,
						decryptedCharacterId	
					];

					// Update character
					connection.query(updateQuery, updateParams, (error, results) => {

						if(error) return next(error);

						connection.query('SELECT * FROM `Characters` AS c WHERE c.id=?', [decryptedCharacterId], (error, results) => {
											
							if(error) return next(error);

							if(results.length === 0) {

								res.send(getResponseMessage(res, 'Character not found', 404, null));

							} else {

								const r = results[0];

								connection.query('SELECT * FROM `Character-Perk` AS cp WHERE cp.characterId = ?', [decryptedCharacterId], (error, results) => {

									if(error) return next(error);

									const perkResults = results;

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
										r.retired,
										perkResults.map(p => p.perkId)
									);

									res.send(getResponseMessage(res, `Character ${ req.params.characterId } updated`, 200, character.get()));
								});
							}
						});
					});
				}
			});
		})
	})
});

module.exports = router;
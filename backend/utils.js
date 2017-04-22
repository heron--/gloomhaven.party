const Character = require('./models/Character');
const User = require('./models/User');
const config = require('config');
const Cryptr = require('cryptr');

const encryptionConfig = config.get('encryptionConfig');
const cryptr = new Cryptr(encryptionConfig.secret);

function utils() {
	function getResponseMessage(res, message, code, data) {
		res.status(code);
		return JSON.stringify({
			message,
			code,
			data: data ? data : {}
		});
	}

	function getLoginErrorMessage(res) {
		return getResponseMessage(res, 'User Not Logged In', 401, null);
	}

	function getUserCharacters(req, res, next) {
		req.getConnection((error, connection) => {

			if(error) return next(error);
			
			const encryptedEmail = cryptr.encrypt(req.gloomhavensession.user.email);

			connection.query('SELECT id FROM `Users` AS u where u.email=?', [encryptedEmail], (error, results) => {

				if(error) return next(error);

				const r = results[0];
				const userId = r.id;

				const characterSelectQuery = `
					SELECT * FROM \`Characters\` AS c
					INNER JOIN \`User-Character\` AS uc
					ON uc.userId=8 AND c.id=uc.characterId
					INNER JOIN \`Character-Perk\` AS cp ON cp.characterId = uc.characterId
				`;

				connection.query(characterSelectQuery, [userId], (error, results) => {

					const characters = [];

					results.forEach(r => {
						const matchingEntry = characters.filter(c => c.id === r.id)[0];

						if(typeof matchingEntry === 'undefined') {
							characters.push({
								id: r.id,
								classId: r.classId,
								name: r.name,
								level: r.level,
								experienceNotes: r.experienceNotes,
								goldNotes: r.goldNotes,
								items: r.items,
								checks: r.checks,
								notes: r.notes,
								retired: r.retired,
								perks: [
									r.perkId
								]
							})

						} else {

							matchingEntry.perks.push(r.perkId);

						}

					});

					res.send(getResponseMessage(res, 'User is logged in', 200, {
						user: new User(req.gloomhavensession.user.email),
						userCharacters: characters.map(c => new Character(
							c.id,
							c.classId,
							c.name,
							c.level,
							c.experienceNotes,
							c.goldNotes,
							c.items,
							c.checks,
							c.notes,
							c.retired,
							c.perks
						).get())
					}));	
				});

			});

		})	
	}

	return {
		getResponseMessage,
		getLoginErrorMessage,
		getUserCharacters
	};
}

module.exports = utils;
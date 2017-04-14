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

				connection.query('SELECT * FROM `Characters` AS c INNER JOIN `User-Character` as uc ON uc.userId=? AND c.id=uc.characterId', [userId], (error, results) => {
					
					res.send(getResponseMessage(res, 'User is logged in', 200, {
						user: new User(req.gloomhavensession.user.email),
						userCharacters: results.map(r => new Character(
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
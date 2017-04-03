const config = require('config');
const Cryptr = require('cryptr');

const encryptionConfig = config.get('encryptionConfig');
const cryptr = new Cryptr(encryptionConfig.secret);

function CharacterClass(id, name) {
	this.id = cryptr.encrypt(id);	
	this.name = name;
}

CharacterClass.prototype.get = function get() {

	return {
		id: this.id,
		name: this.name
	};
};

module.exports = CharacterClass;
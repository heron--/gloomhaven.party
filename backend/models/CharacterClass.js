const config = require('config');
const Cryptr = require('cryptr');
const leftPad = require('left-pad');

const encryptionConfig = config.get('encryptionConfig');
const cryptr = new Cryptr(encryptionConfig.secret);

function CharacterClass(id, name, spoiler = false) {
	this.id = id;	
	this.name = name;
	this.spoiler = spoiler;
}

CharacterClass.prototype.get = function get() {

	return {
		id: cryptr.encrypt(this.id),
		spoiler: this.spoiler,
		className: `gloomhaven-icon-class-${leftPad(this.id, 2, '0')}`,
		svgName: `Class${leftPad(this.id, 2, '0')}Icon`,
		displayName: this.name
	};
};

module.exports = CharacterClass;
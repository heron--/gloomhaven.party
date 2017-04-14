const config = require('config');
const Cryptr = require('cryptr');
const leftPad = require('left-pad');

const encryptionConfig = config.get('encryptionConfig');
const cryptr = new Cryptr(encryptionConfig.secret);

function Character(id, classId, name, level, experienceNotes, goldNotes, items, checks, notes, retired) {
	this.id = id;	
	this.classId = classId;
	this.name = name;
	this.level = level;
	this.experienceNotes = experienceNotes;
	this.goldNotes = goldNotes;
	this.items = items;
	this.checks = checks;
	this.notes = notes;
	this.retired = retired;
}

Character.prototype.get = function get() {

	return {
		id: cryptr.encrypt(this.id),
		classId: cryptr.encrypt(this.classId),
		name: this.name,
		level: this.level,
		experienceNotes: this.experienceNotes,
		goldNotes: this.goldNotes,
		items: this.items,
		checks: this.checks,
		notes: this.notes,
		retired: this.retired
	};
};

module.exports = Character;
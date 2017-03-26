function User(email) {
	this.email = email;	
	this.firstSession = false;
}

User.prototype.get = function get() {

	return {
		email: this.email,
		firstSession: this.firstSession
	};
};

User.prototype.setFirstSession = function setFirstSession(firstSession) {
	this.firstSession = firstSession;
};


module.exports = User;
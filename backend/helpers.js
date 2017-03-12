const helpers = {
	getResponseMessage: function getResponseMessage(message, code, data) {
		return JSON.stringify({
			message,
			code,
			data
		});
	}
};

module.exports = helpers;
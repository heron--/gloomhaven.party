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

	return {
		getResponseMessage,
		getLoginErrorMessage
	};
}

module.exports = utils;
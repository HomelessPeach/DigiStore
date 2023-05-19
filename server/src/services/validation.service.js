class ValidationService {

	static clearData(data) {
		const clearData = {};
		for (let key in data) {
			if (data[key] || data[key] === false)
				clearData[key] = data[key];
		}
		return clearData;
	}

}

module.exports = {ValidationService}
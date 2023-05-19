class ApiError extends Error {

	status;
	errors;

	constructor(status, message, errors = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static ValidationError(error) {
		return new ApiError(400, 'Ошибка валидации', error);
	}

	static PaginationError(message) {
		return new ApiError(405, message);
	}

	static BadRequest(message) {
		return new ApiError(400, message);
	}

	static NotFound(message) {
		return new ApiError(404, message);
	}

	static UnauthorizedError() {
		return new ApiError(401, 'Пользователь не авторизован!');
	}

	static NotAllowed(message) {
		return new ApiError(405, message);
	}

	static NoContent(message) {
		return new ApiError(204, message);
	}

	static MailingError(message) {
		return new ApiError(550, message);
	}
}

module.exports = {ApiError}


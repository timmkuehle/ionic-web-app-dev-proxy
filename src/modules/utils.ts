export const checkEnv = () => {
	if (typeof process === "undefined") {
		throw new Error(
			"Error: Incompatible environment: This script is supposed to run in a nodeJS environment"
		);
	}
};

export const getStatusDescription = (status: number) => {
	switch (status) {
		case 200:
			return "OK";
		case 400:
			return "Bad Request";
		case 401:
			return "Unauthorized";
		case 403:
			return "Forbidden";
		case 404:
			return "Not Found";
		case 413:
			return "Content Too Large";
		case 500:
			return "Internal Server Error";
		default:
			return "Unknown Error";
	}
};

export const stringifyData = (data: object, contentType: string) => {
	if (contentType === "application/json") {
		return JSON.stringify(data);
	}

	return data.toString();
};

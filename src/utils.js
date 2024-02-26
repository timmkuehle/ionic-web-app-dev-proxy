import { IS_LOCAL_WEB_APP, WEB_APP_DEV_PROXY_URL } from "./constants.js";

export const getStatusDescription = (status) => {
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

export const stringifyData = (data, contentType) => {
	if (contentType === "application/json") {
		return JSON.stringify(data);
	}

	return data.toString();
};

export const adaptFetchUrl = (url) => {
	return IS_LOCAL_WEB_APP ? `${WEB_APP_DEV_PROXY_URL}/${url}` : url;
};

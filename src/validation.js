import { logRequestResponse } from "./logFunctions.js";

export const urlIsValid = (url, res) => {
	if (
		!/^http(s*)\:\/\/(www\.)?([\w0-9\-]+\.)+[a-z]{2,63}(\/[\w0-9\-]+)*(\.[\w0-9]+)*([\?\&][\w0-9\-\_]+\=[\w0-9\-\_\%]*)*$/.test(
			url
		)
	) {
		logRequestResponse(400, "Target URL is invalid");

		res.writeHead(400);
		res.end();

		return false;
	}

	return true;
};

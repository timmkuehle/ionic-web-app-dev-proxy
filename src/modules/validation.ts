import { IncomingMessage, ServerResponse } from "http";
import { resolveWithError } from "./resolve";

export const urlIsValid = (
	req: IncomingMessage,
	res: ServerResponse<IncomingMessage>,
	url: string
) => {
	if (
		!/^https?:\/\/(www\.)?([\w0-9-]+\.)+[a-z]{2,63}(\/[\w0-9-]+)*(\.[\w0-9]+)*([?&][\w0-9-_]+=[\w0-9-_%]*)*$/.test(
			url
		)
	) {
		resolveWithError(req, res, 400, "Target URL is invalid");

		return false;
	}

	return true;
};

export const serverAddressIsValid = (url: string) => {
	if (
		!/^(https?:\/\/(www\.)?([\w0-9-]+\.?)+([a-z]{2,63})?|([0-9]{1,3}\.){3}[0-9]{1,3}):[0-9]{1,5}$/.test(
			url
		)
	) {
		return false;
	}

	return true;
};

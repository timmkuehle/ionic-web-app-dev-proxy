import { IncomingMessage, ServerResponse } from "http";
import { resolveWithError } from "./resolve";

export const urlIsValid = (
	req: IncomingMessage,
	res: ServerResponse<IncomingMessage>,
	url: string
) => {
	if (
		!/^http(s*):\/\/(www\.)?([\w0-9-]+\.)+[a-z]{2,63}(\/[\w0-9-]+)*(\.[\w0-9]+)*([?&][\w0-9-_]+=[\w0-9-_%]*)*$/.test(
			url
		)
	) {
		resolveWithError(req, res, 400, "Target URL is invalid");

		return false;
	}

	return true;
};

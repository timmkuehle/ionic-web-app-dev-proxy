import { IncomingMessage, ServerResponse } from "http";
import { ALLOWED_ORIGINS } from "./constants";
import { setHeaders } from "./headers";
import { resolveRequest, resolveWithError } from "./resolve";

export const runPreflightCheck = (
	req: IncomingMessage,
	res: ServerResponse<IncomingMessage>,
	ionicServeAddress: string | null
) => {
	const { origin } = req.headers;

	setHeaders(res);

	let error = null;
	if (!origin) {
		error = {
			code: 400,
			message: "Proxy server is unable to determine request origin"
		};
	} else if (![...ALLOWED_ORIGINS, ionicServeAddress].includes(origin)) {
		error = {
			code: 403,
			message: `Origin [${origin}] is not allowed to access proxy server`
		};
	}

	if (error) {
		resolveWithError(req, res, error.code, error.message);
		return;
	}

	resolveRequest(res, 200);
};

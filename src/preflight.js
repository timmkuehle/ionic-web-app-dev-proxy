import { allowedOrigins } from "./constants.js";
import { setHeaders } from "./headers.js";
import { resolveWithError } from "./resolve.js";

export const runPreflightCheck = (req, res) => {
	const { origin } = req.headers;

	setHeaders(res);

	let error = null;
	if (!allowedOrigins.includes(origin)) {
		error = {
			code: 403,
			message: `Origin [${origin}] is not allowed to access proxy server`,
		};
	}

	resolveWithError(req, res, error?.code || 200, error?.message);
};

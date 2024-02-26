import { logRequestResponse } from "./logFunctions.js";
import { getStatusDescription } from "./utils.js";

export const resolveWithError = (req, res, status, message, debug = null) => {
	logRequestResponse(status, message);

	res.setHeader("Content-Type", "application/json");

	res.writeHead(status);
	res.end(
		JSON.stringify({
			error: {
				code: status,
				http_status: status,
				message: `${status}: ${getStatusDescription(status)}`,
				data: debug ? { debug } : {}
			}
		})
	);

	req.destroy();
};

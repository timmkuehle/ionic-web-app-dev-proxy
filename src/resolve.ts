import { IncomingMessage, ServerResponse } from "http";
import { logRequestResponse } from "./logFunctions.js";
import { getStatusDescription, stringifyData } from "./utils.js";

export const resolveRequest = (
	res: ServerResponse<IncomingMessage>,
	status: number,
	contentType: string,
	data?: {}
) => {
	logRequestResponse(status);

	res.setHeader("Content-Type", contentType);

	res.writeHead(status);
	res.end(stringifyData(data, contentType));
};

export const resolveWithError = (
	req: IncomingMessage,
	res: ServerResponse<IncomingMessage>,
	status: number,
	message: string,
	debug: string | null = null
) => {
	logRequestResponse(status, message);

	res.setHeader("Content-Type", "application/json");

	res.writeHead(status);
	res.end(
		JSON.stringify({
			error: {
				code: status,
				http_status: status,
				message: `${status}: ${getStatusDescription(status)}`,
				data: debug ? { debug } : {},
			},
		})
	);

	req.destroy();
};

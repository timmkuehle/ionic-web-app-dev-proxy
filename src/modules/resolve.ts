import { IncomingMessage, ServerResponse } from "http";
import { logRequestResponse } from "./logFunctions";
import { getStatusDescription, stringifyData } from "./utils";

export const resolveRequest = (
	res: ServerResponse<IncomingMessage>,
	status: number,
	body?: { contentType: string; data: object }
) => {
	const contentType = body?.contentType || "application/json";

	logRequestResponse(status);

	if (body) {
		res.setHeader("Content-Type", contentType);
	}

	res.writeHead(status);
	res.end(body ? stringifyData(body.data, contentType) : null);
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

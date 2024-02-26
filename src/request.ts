import { IncomingMessage, ServerResponse } from "http";
import { MAX_REQUEST_BODY_SIZE_MB } from "./constants.js";
import { resolveRequest, resolveWithError } from "./resolve.js";

export const forwardRequest = (
	url: string,
	req: IncomingMessage,
	res: ServerResponse<IncomingMessage>
) => {
	const reqContentType = req.headers["content-type"] || "application/json";

	let reqBody = "";
	let reqBodySize = 0;

	req.on("data", (chunk) => {
		reqBodySize += chunk.length;
		if (reqBodySize > MAX_REQUEST_BODY_SIZE_MB * 1024 * 1024) {
			const errMsg =
				"Request body size exceeds proxy server maximum limit (" +
				MAX_REQUEST_BODY_SIZE_MB +
				"MB)";

			resolveWithError(req, res, 413, errMsg, `HTTP Error: 413: ${errMsg}`);
			return;
		}

		reqBody += chunk;
	});

	req.on("end", async () => {
		try {
			const response = await fetch(url, {
				method: req.method,
				headers: {
					"Content-Type": reqContentType,
				},
				body: reqBody,
			});

			const resContentType =
				response.headers.get("content-type") || "application/json";

			const data =
				reqContentType === "application/json"
					? await response.json()
					: response.text();

			resolveRequest(res, response.status, resContentType, data);
		} catch (err) {
			const { stack, code, message } = err as NodeJS.ErrnoException;

			const errMsg = stack?.split("\n")[0] || `Error: ${code}: ${message}`;

			resolveWithError(req, res, 500, errMsg, stack);
		}
	});
};

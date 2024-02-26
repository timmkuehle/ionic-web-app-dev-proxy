import { MAX_REQUEST_BODY_SIZE_MB } from "./constants.js";
import { logRequestResponse } from "./logFunctions.js";
import { resolveWithError } from "./resolve.js";
import { stringifyData } from "./utils.js";

export const forwardRequest = (url, req, res) => {
	const reqContentType = req.headers["content-type"] || "application/json";

	req.body = "";
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

		req.body += chunk;
	});

	req.on("end", async () => {
		try {
			const response = await fetch(url, {
				method: req.method,
				headers: {
					"Content-Type": reqContentType
				},
				body: req.body
			});

			const resContentType =
				response.headers.get("content-type") || "application/json";

			logRequestResponse(response.status);

			res.setHeader("Content-Type", resContentType);

			res.writeHead(response.status);
			res.end(stringifyData(await response.json(), resContentType));
		} catch (error) {
			resolveWithError(req, res, 500, error.stack.split("\n")[0], error.stack);
		}
	});
};

import http from "http";
import { WEB_APP_DEV_PROXY_HOST, WEB_APP_DEV_PROXY_PORT } from "./constants.js";
import { runPreflightCheck } from "./preflight.js";
import { setHeaders } from "./headers.js";
import { urlIsValid } from "./validation.js";
import { forwardRequest } from "./request.js";
import {
	logServerStartup,
	logServerUrl,
	logServerError,
	logIncomingRequest,
	logServerShutdown
} from "./logFunctions.js";

logServerStartup();

try {
	http
		.createServer((req, res) => {
			const targetUrl = req.url.replace(/^\//, "");

			logIncomingRequest(targetUrl, req.method);

			if (req.method === "OPTIONS") {
				runPreflightCheck(req, res);
				return;
			}

			setHeaders(res, req.headers.origin);

			if (!urlIsValid(targetUrl, res)) return;

			forwardRequest(targetUrl, req, res);
		})
		.listen(WEB_APP_DEV_PROXY_PORT, WEB_APP_DEV_PROXY_HOST, () => {
			logServerUrl();
		})
		.on("error", (err) => {
			logServerError(err);
		});
} catch (err) {
	logServerError(err);
}

process.on("SIGINT", () => {
	logServerShutdown();
	process.exit(0);
});

process.on("SIGTERM", () => {
	logServerShutdown();
	process.exit(0);
});

export { parseFetchUrl } from "./utils.js";

import http from "http";
import {
	WEB_APP_DEV_PROXY_HOST,
	WEB_APP_DEV_PROXY_PORT
} from "../modules/constants";
import { checkEnv } from "./modules/utils";
import { runPreflightCheck } from "./modules/preflight";
import { setHeaders } from "./modules/headers";
import { urlIsValid } from "./modules/validation";
import { forwardRequest } from "./modules/request";
import {
	logServerStartup,
	logServerUrl,
	logServerError,
	logIncomingRequest,
	logServerShutdown
} from "./modules/logFunctions";

checkEnv();

logServerStartup();

try {
	http.createServer((req, res) => {
		const targetUrl = req.url?.replace(/^\//, "") || "/";

		logIncomingRequest(targetUrl, req.method);

		if (req.method === "OPTIONS") {
			runPreflightCheck(req, res);
			return;
		}

		setHeaders(res, req.headers.origin);

		if (!urlIsValid(req, res, targetUrl)) return;

		forwardRequest(req, res, targetUrl);
	})
		.listen(WEB_APP_DEV_PROXY_PORT, WEB_APP_DEV_PROXY_HOST, () => {
			logServerUrl();
		})
		.on("error", (err) => {
			logServerError(err);
		});
} catch (err) {
	logServerError(err as NodeJS.ErrnoException);
}

process.on("SIGINT", () => {
	logServerShutdown();
	process.exit(0);
});

process.on("SIGTERM", () => {
	logServerShutdown();
	process.exit(0);
});

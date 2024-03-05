import http from "http";
import { WEB_APP_DEV_PROXY_HOST, WEB_APP_DEV_PROXY_PORT } from "../constants";
import { checkEnv } from "./modules/utils";
import { runPreflightCheck } from "./modules/preflight";
import { setHeaders } from "./modules/headers";
import { urlIsValid } from "./modules/validation";
import { forwardRequest } from "./modules/request";
import {
	logServerStartup,
	logServerUrl,
	logIncomingRequest,
	logServerShutdown
} from "./modules/logFunctions";
import { getIonicServeAddressFromArgv } from "./modules/ionicServe";
import { shutdownServer } from "./modules/proxyServer";

checkEnv();

logServerStartup();

let ionicServeAdress: string | null;

try {
	http.createServer((req, res) => {
		const targetUrl = req.url?.replace(/^\//, "") || "/";

		logIncomingRequest(targetUrl, req.method);

		if (req.method === "OPTIONS") {
			runPreflightCheck(req, res, ionicServeAdress);
			return;
		}

		setHeaders(res, req.headers.origin);

		if (!urlIsValid(req, res, targetUrl)) return;

		forwardRequest(req, res, targetUrl);
	})
		.listen(WEB_APP_DEV_PROXY_PORT, WEB_APP_DEV_PROXY_HOST, () => {
			ionicServeAdress = getIonicServeAddressFromArgv();

			if (!ionicServeAdress) shutdownServer(undefined, 1);

			logServerUrl();
		})
		.on("error", (err) => {
			shutdownServer(err);
		});
} catch (err) {
	shutdownServer(err as NodeJS.ErrnoException);
}

process.on("exit", () => {
	logServerShutdown();
});

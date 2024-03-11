import http, { Server } from "http";
import { ChildProcess, ChildProcessWithoutNullStreams } from "child_process";
import {
	WEB_APP_DEV_PROXY_HOST,
	WEB_APP_DEV_PROXY_PORT
} from "../../constants";
import { checkEnv } from "./utils";
import { runPreflightCheck } from "./preflight";
import { setHeaders } from "./headers";
import { serverAddressIsValid, urlIsValid } from "./validation";
import { forwardRequest } from "./request";
import { shutdownIonicServe } from "./ionicServe";
import {
	logProxyServerStartup,
	logProxyServerError,
	logProxyServerUrl,
	logIncomingRequest,
	logProxyServerShutdown
} from "./logFunctions";

export const startProxyServer = (ionicServeAddress: string) => {
	checkEnv();

	logProxyServerStartup();

	let proxyServer: Server | null = null;
	try {
		if (!serverAddressIsValid(ionicServeAddress)) {
			throw new Error(
				`Invalid Parameter: [${ionicServeAddress}] is not a valid Ionic app development server address`
			);
		}

		proxyServer = http
			.createServer((req, res) => {
				const targetUrl = req.url?.replace(/^\//, "") || "/";

				logIncomingRequest(targetUrl, req.method);

				if (req.method === "OPTIONS") {
					runPreflightCheck(req, res, ionicServeAddress);
					return;
				}

				setHeaders(res, req.headers.origin);

				if (!urlIsValid(req, res, targetUrl)) return;

				forwardRequest(req, res, targetUrl);
			})
			.listen(WEB_APP_DEV_PROXY_PORT, WEB_APP_DEV_PROXY_HOST, () => {
				logProxyServerUrl();
			})
			.on("error", (err) => {
				logProxyServerError(err, true);
			});
	} catch (err) {
		shutdownProxyServer(proxyServer, err as NodeJS.ErrnoException);
	}

	return proxyServer;
};

export const shutdownProxyServer = (
	proxyServer: Server | null,
	err?: Error
) => {
	if (err) {
		logProxyServerError(err);
	}

	if (!proxyServer || !proxyServer.listening) {
		logProxyServerShutdown(false);
		return;
	}

	proxyServer.close((err) => {
		logProxyServerShutdown(true, err);
	});
};

export const exitScriptOnProxyError = (
	proxyProcess: ChildProcess,
	ionicServeProcess: ChildProcessWithoutNullStreams
) => {
	proxyProcess.on("exit", () => {
		if (proxyProcess.exitCode !== 0) {
			shutdownIonicServe(ionicServeProcess);

			process.exit(1);
		}
	});
};

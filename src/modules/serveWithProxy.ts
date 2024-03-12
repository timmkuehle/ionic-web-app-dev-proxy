import { spawn } from "child_process";
import { Server } from "http";
import { IONIC_DEV_SERVER_RUNNING_REGEX } from "./constants";
import { checkEnv } from "./utils";
import {
	logHmrUpdate,
	logIonicServeAddress,
	logIonicServeError,
	logIonicServeShutdown,
	logIonicServeStart
} from "./logFunctions";
import { shutdownProxyServer, startProxyServer } from "./proxyServer";
import { getIonicServeAddress, shutdownIonicServe } from "./ionicServe";

export const serveWithProxy = () => {
	checkEnv();

	logIonicServeStart();

	const ionicServe = spawn("ionic", ["serve"]);

	ionicServe.on("error", (err) => {
		logIonicServeError(err);
	});

	ionicServe.stderr.on("data", (err) => {
		logIonicServeError({ message: err.toString() });
	});

	let proxyServer: Server | null = null;
	ionicServe.stdout.on("data", (data) => {
		const stringifiedData = data.toString();

		if (IONIC_DEV_SERVER_RUNNING_REGEX.test(data)) {
			const ionicServeAddress = getIonicServeAddress(
				stringifiedData,
				ionicServe
			);

			if (!ionicServeAddress) return;

			logIonicServeAddress(ionicServeAddress);

			proxyServer = startProxyServer(ionicServeAddress);

			if (!proxyServer) {
				shutdownIonicServe(ionicServe, "SIGTERM");
			}

			return;
		}

		logHmrUpdate(stringifiedData);
	});

	ionicServe.on("close", () => {
		logIonicServeShutdown();

		if (proxyServer) shutdownProxyServer(proxyServer);
	});

	return ionicServe;
};

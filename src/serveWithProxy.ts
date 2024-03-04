import path from "path";
import { spawn, fork } from "child_process";
import {
	logIonicServeAddress,
	logIonicServeStart
} from "./modules/logFunctions";
import { getIonicServeAddress } from "./modules/ionicServe";
import { IONIC_DEV_SERVER_RUNNING_REGEX } from "../modules/constants";

logIonicServeStart();

const ionicServe = spawn("ionic", ["serve", "--no-open"]);

ionicServe.stdout?.on("data", (data) => {
	const stringifiedData = data.toString();

	if (IONIC_DEV_SERVER_RUNNING_REGEX.test(data)) {
		const ionicServeAddress = getIonicServeAddress(
			stringifiedData,
			ionicServe
		);

		if (!ionicServeAddress) return;

		logIonicServeAddress(ionicServeAddress);

		const proxyServer = fork("./scripts/startServer.js");

		return;
	}

	if (/hmr update/.test(stringifiedData)) {
		console.log(stringifiedData.replace(/^\[vite\] |\n/g, ""));

		return;
	}
});

ionicServe.on("exit", () => {
	console.log("\nShutting down Ionic app development server ...");
});

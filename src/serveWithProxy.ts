import { spawn, fork } from "child_process";
import { checkEnv } from "./modules/utils";
import { IONIC_DEV_SERVER_RUNNING_REGEX } from "../modules/constants";
import { getIonicServeAddress, shutdownIonicServe } from "./modules/ionicServe";
import {
	logHmrUpdate,
	logIonicServeAddress,
	logIonicServeError,
	logIonicServeStart
} from "./modules/logFunctions";

checkEnv();

logIonicServeStart();

const ionicServe = spawn("ionic", ["serve", "--no-open"]);

ionicServe.on("error", (error) => {
	logIonicServeError(error);
});

ionicServe.stderr.on("data", (error) => {
	logIonicServeError({ message: error.toString() });
});

ionicServe.stdout.on("data", (data) => {
	const stringifiedData = data.toString();

	if (IONIC_DEV_SERVER_RUNNING_REGEX.test(data)) {
		const ionicServeAddress = getIonicServeAddress(
			stringifiedData,
			ionicServe
		);

		if (!ionicServeAddress) return;

		logIonicServeAddress(ionicServeAddress);

		fork("scripts/startServer.js");

		return;
	}

	logHmrUpdate(stringifiedData);
});

process.on("SIGTERM", () => {
	shutdownIonicServe(ionicServe);
	process.exit(0);
});

process.on("SIGINT", () => {
	shutdownIonicServe(ionicServe);
	process.exit(0);
});

import { ChildProcessWithoutNullStreams, ExecException } from "child_process";
import { IONIC_DEV_SERVER_LOCAL_REGEX } from "../../constants";
import { logIonicServeError, logIonicServeShutdown } from "./logFunctions";
import { serverAddressIsValid } from "./validation";

export const getIonicServeAddress = (
	data: string,
	ionicServeProcess: ChildProcessWithoutNullStreams
) => {
	const ionicDevServerUrlMatches = data.match(/Local: .*\n/);

	if (!ionicDevServerUrlMatches || !ionicDevServerUrlMatches.length) {
		shutdownIonicServe(ionicServeProcess, "SIGTERM", {
			message:
				"Error: Unable to retrieve local Ionic app development server URL"
		});

		return null;
	}

	const ionicServeAddress = ionicDevServerUrlMatches[0].replace(
		IONIC_DEV_SERVER_LOCAL_REGEX,
		""
	);

	if (!serverAddressIsValid(ionicServeAddress)) {
		shutdownIonicServe(ionicServeProcess, "SIGTERM", {
			message: `Error: [${ionicServeAddress}] is not a valid Ionic app development server address`
		});

		return null;
	}

	return ionicServeAddress;
};

export const shutdownIonicServe = (
	ionicServeProcess: ChildProcessWithoutNullStreams | null,
	signal: "SIGINT" | "SIGTERM",
	error?: ExecException | { message: string }
) => {
	if (error) {
		logIonicServeError(error);
	}

	if (!ionicServeProcess || ionicServeProcess.killed) {
		logIonicServeShutdown(false);
		return;
	}

	ionicServeProcess.kill(signal);
};

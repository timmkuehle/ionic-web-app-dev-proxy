import { ChildProcessWithoutNullStreams, ExecException } from "child_process";
import { logIonicServeError, logIonicServeShutdown } from "./logFunctions";
import { serverAddressIsValid } from "./validation";
import { IONIC_DEV_SERVER_LOCAL_REGEX } from "../../constants";

export const getIonicServeAddress = (
	data: string,
	ionicServeProcess: ChildProcessWithoutNullStreams
) => {
	const ionicDevServerUrlMatches = data.match(/Local: .*\n/);

	if (!ionicDevServerUrlMatches || !ionicDevServerUrlMatches.length) {
		shutdownIonicServe(ionicServeProcess, {
			message:
				"Error: Unable to retrieve local Ionic app development server URL"
		});

		return null;
	}

	const ionicDevServerUrl = ionicDevServerUrlMatches[0].replace(
		IONIC_DEV_SERVER_LOCAL_REGEX,
		""
	);

	if (!serverAddressIsValid(ionicDevServerUrl)) {
		shutdownIonicServe(ionicServeProcess, {
			message: `Error: Ionic app development server address [${ionicDevServerUrl}] is invalid`
		});

		return null;
	}

	return ionicDevServerUrl;
};

export const shutdownIonicServe = (
	ionicServeProcess: ChildProcessWithoutNullStreams,
	error?: ExecException | { message: string }
) => {
	if (error) {
		logIonicServeError(error);
	}

	logIonicServeShutdown();

	if (!ionicServeProcess.killed) {
		ionicServeProcess.kill("SIGTERM");
	}
};

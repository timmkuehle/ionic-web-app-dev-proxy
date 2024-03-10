import { ChildProcessWithoutNullStreams, ExecException } from "child_process";
import {
	logIonicServeError,
	logIonicServeShutdown,
	logServerError
} from "./logFunctions";
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

	const ionicServeAddress = ionicDevServerUrlMatches[0].replace(
		IONIC_DEV_SERVER_LOCAL_REGEX,
		""
	);

	if (!serverAddressIsValid(ionicServeAddress)) {
		shutdownIonicServe(ionicServeProcess, {
			message: `Error: [${ionicServeAddress}] is not a valid Ionic app development server address`
		});

		return null;
	}

	return ionicServeAddress;
};

export const getIonicServeAddressFromArgv = () => {
	const { argv } = process;

	if (argv.length <= 2) {
		logServerError({
			code: "NOIONADDRARG",
			message: "Missing Argument: No Ionic serve address provided"
		});

		return null;
	}

	const ionicServeAddress = argv[2];

	if (!serverAddressIsValid(ionicServeAddress)) {
		logServerError({
			code: "INVIONADDRARG",
			message: `Invalid Argument: [${ionicServeAddress}] is not a valid Ionic app development server address`
		});

		return null;
	}

	return ionicServeAddress;
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

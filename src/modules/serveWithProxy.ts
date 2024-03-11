import {
	spawn,
	ChildProcessWithoutNullStreams,
	ExecException
} from "child_process";
import {
	IONIC_DEV_SERVER_LOCAL_REGEX,
	IONIC_DEV_SERVER_RUNNING_REGEX
} from "../../constants";
import { checkEnv } from "./utils";
import {
	logHmrUpdate,
	logIonicServeAddress,
	logIonicServeError,
	logIonicServeShutdown,
	logIonicServeStart
} from "./logFunctions";
import { serverAddressIsValid } from "./validation";
import { startProxyServer } from "./proxyServer";

export const serveWithProxy = () => {
	checkEnv();

	logIonicServeStart();

	const ionicServe = spawn("ionic", ["serve", "--no-open"]);

	ionicServe.on("error", (err) => {
		logIonicServeError(err);
	});

	ionicServe.stderr.on("data", (err) => {
		logIonicServeError({ message: err.toString() });
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

			const proxyServer = startProxyServer(ionicServeAddress);

			if (!proxyServer) {
				shutdownIonicServe(ionicServe);
			}

			return;
		}

		logHmrUpdate(stringifiedData);
	});
};

const getIonicServeAddress = (
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

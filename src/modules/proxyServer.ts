import { shutdownIonicServe } from "./ionicServe";
import { logServerError } from "./logFunctions";
import { ChildProcess, ChildProcessWithoutNullStreams } from "child_process";

export const shutdownServer = (
	err?:
		| NodeJS.ErrnoException
		| { code: string; message: string; stack?: string },
	code?: number
) => {
	if (err) {
		logServerError(err);

		process.exit(code || 1);
	}

	process.exit(code || 0);
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

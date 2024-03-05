import { logServerError } from "./logFunctions";

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

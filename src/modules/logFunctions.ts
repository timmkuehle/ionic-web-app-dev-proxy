import colors from "colors";
import {
	IS_WEBPACK_WATCH,
	WEB_APP_DEV_PROXY_URL
} from "../../modules/constants";
import { getStatusDescription } from "./utils";
import { ExecException } from "child_process";

export const logServerStartup = () => {
	console.log(
		`${IS_WEBPACK_WATCH ? "\n" : ""}Starting proxy server for web app development ...\n`
	);
};

export const logServerShutdown = () => {
	console.log("\nShutting down proxy server for web app development ...\n");
};

export const logServerUrl = () => {
	console.log(`${colors.green(`  ➜ ${WEB_APP_DEV_PROXY_URL}`)}\n`);
};

export const logServerError = (err: NodeJS.ErrnoException) => {
	let errMsg;
	switch (err.code) {
		case "EADDRINUSE":
			errMsg = `Error: listen EADDRINUSE: ${WEB_APP_DEV_PROXY_URL} is already in use.`;
			break;
		default:
			errMsg =
				err.stack?.split("\n")[0] ||
				`Error: ${err.code}: ${err.message}`;
	}

	console.log(colors.red(`  ➜ ${errMsg}\n`));
};

const baseLog =
	colors.grey(
		new Date().toLocaleTimeString(
			Intl.DateTimeFormat().resolvedOptions().locale
		)
	) + colors.cyan(" [webAppDevProxy] ");

export const logIncomingRequest = (url: string, method?: string) => {
	const isPreflight = method === "OPTIONS";

	console.log(
		baseLog +
			(isPreflight
				? colors.yellow("incoming preflight request ➜ ")
				: colors.green("incoming request ➜ ")) +
			colors.grey(
				`URL: ${(isPreflight ? colors.yellow : colors.green)(url)}` +
					(!isPreflight
						? ` Method: ${colors.green(method || "UNKNOWN")}`
						: "")
			)
	);
};

export const logRequestResponse = (
	status: number,
	errorMessage?: string,
	isPreflight?: boolean
) => {
	console.log(
		baseLog +
			(isPreflight
				? colors.yellow("resolving preflight request ➜ ")
				: colors.green("resolving request ➜ ")) +
			colors.gray("Status: ") +
			(!(status >= 200 && status <= 299)
				? colors.red(
						`${status} - ${getStatusDescription(status)}` +
							(errorMessage ? `: ${errorMessage}` : "")
					)
				: colors.green(`${status} - ${getStatusDescription(status)}`))
	);
};

export const logIonicServeStart = () => {
	console.log(
		`${IS_WEBPACK_WATCH ? "\n" : ""}Starting development server ...`
	);
};

export const logIonicServeError = (err: ExecException) => {
	console.log(
		colors.red("\n  ➜ Error: Unable to serve Ionic App") +
			colors.cyan(
				`\n\nNote: The ${colors.yellow("serveWithProxy")} script is supposed to run in an Ionic project directory.\nPlease make sure that the Ionic CLI is installed on your system and that \nthis script is executed in the root directory of your Ionic project.\nIf you intend to run the proxy server only, use the ${colors.yellow("startServer")} script.\nFor more information, read the original error message below.\n\n`
			) +
			colors.red(err.message)
	);
};

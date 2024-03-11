import colors from "colors";
import {
	IONIC_DEV_SERVER_HMR_REGEX,
	IS_WEBPACK_WATCH,
	SCRIPTS,
	WEB_APP_DEV_PROXY_URL
} from "../../constants";
import { getStatusDescription } from "./utils";
import { ExecException } from "child_process";

export const logProxyServerStartup = () => {
	console.log(
		`${IS_WEBPACK_WATCH ? "\n" : ""}Starting proxy server for web app development ...\n`
	);
};

export const logProxyServerShutdown = () => {
	console.log(`\nShutting down proxy server for web app development ...\n`);
};

export const logProxyServerUrl = () => {
	console.log(`${colors.green(`  ➜ ${WEB_APP_DEV_PROXY_URL}`)}\n`);
};

export const logProxyServerError = (
	err:
		| NodeJS.ErrnoException
		| { code: string; message: string; stack?: string }
) => {
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

	errMsg = errMsg.replace(/\[[^\]]+\]/g, (match) =>
		colors.yellow(match.replace(/[[\]]/g, ""))
	);

	console.log(colors.red(`  ➜ ${errMsg}\n`));
};

const baseLog =
	colors.grey(
		new Date().toLocaleTimeString(
			Intl.DateTimeFormat().resolvedOptions().locale
		)
	) + colors.cyan.bold(" [webAppDevProxy] ");

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
		`${IS_WEBPACK_WATCH ? "\n" : ""}Starting Ionic app development server ...\n`
	);
};

export const logIonicServeShutdown = () => {
	console.log("Shutting down Ionic app development server ...\n");
};

export const logIonicServeAddress = (address: string) => {
	console.log(colors.green(`  ➜ ${address}\n`));
};

export const logIonicServeError = (
	err: ExecException | { message: string }
) => {
	console.log(
		colors.red("  ➜ Error: Unable to serve Ionic App") +
			colors.cyan(
				`\n\nNote: The ${colors.yellow("serveWithProxy")} script is supposed to run in an Ionic project directory.\nPlease make sure that the Ionic CLI is installed on your system and that \nthis script is executed in the root directory of your Ionic project.\nIf you intend to run the proxy server only, use the ${colors.yellow("startProxyServer")} script.\nFor more information, read the original error message below.\n\n`
			) +
			colors.red(err.message)
	);
};

export const logHmrUpdate = (data: string) => {
	if (!IONIC_DEV_SERVER_HMR_REGEX.test(data)) {
		return;
	}

	console.log(data.replace(/^\[(vite|webpack)\] |\n/g, ""));
};

export const logExecError = (
	err:
		| NodeJS.ErrnoException
		| { code: string; message: string; stack?: string }
) => {
	console.log(
		colors.red(
			(err.stack?.split("\n")[0] ||
				`Error: ${err.code}: ` +
					err.message.replace(
						/ionic-web-app-dev-proxy|\[[^\]]+\]/g,
						(match) => colors.yellow(match.replace(/[[\]]/g, ""))
					)) +
				colors.cyan(
					"\n\nNote: Valid commands are " +
						SCRIPTS.reduce((prevScript, curScript, curIndex) => {
							return (
								(curIndex !== 0
									? prevScript +
										(curIndex < SCRIPTS.length - 1
											? ", "
											: " and ")
									: "") + colors.yellow(curScript)
							);
						}, "") +
						"\n"
				)
		)
	);
};

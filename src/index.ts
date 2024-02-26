export { IS_LOCAL_WEB_APP } from "./constants.js";
export { adaptFetchUrl } from "./utils.js";

if (typeof process !== "undefined") {
	const http = await import("http");
	const { WEB_APP_DEV_PROXY_HOST, WEB_APP_DEV_PROXY_PORT } = await import(
		"./constants.js"
	);
	const { runPreflightCheck } = await import("./preflight");
	const { setHeaders } = await import("./headers");
	const { urlIsValid } = await import("./validation");
	const { forwardRequest } = await import("./request");
	const {
		logServerStartup,
		logServerUrl,
		logServerError,
		logIncomingRequest,
		logServerShutdown,
	} = await import("./logFunctions.js");

	logServerStartup();

	try {
		http
			.createServer((req, res) => {
				const targetUrl = req.url?.replace(/^\//, "") || "/";

				logIncomingRequest(targetUrl, req.method);

				if (req.method === "OPTIONS") {
					runPreflightCheck(req, res);
					return;
				}

				setHeaders(res, req.headers.origin);

				if (!urlIsValid(req, res, targetUrl)) return;

				forwardRequest(req, res, targetUrl);
			})
			.listen(WEB_APP_DEV_PROXY_PORT, WEB_APP_DEV_PROXY_HOST, () => {
				logServerUrl();
			})
			.on("error", (err) => {
				logServerError(err);
			});
	} catch (err) {
		logServerError(err as NodeJS.ErrnoException);
	}

	process.on("SIGINT", () => {
		logServerShutdown();
		process.exit(0);
	});

	process.on("SIGTERM", () => {
		logServerShutdown();
		process.exit(0);
	});
}

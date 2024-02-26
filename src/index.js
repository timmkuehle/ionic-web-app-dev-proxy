export { IS_LOCAL_WEB_APP } from "./constants.js";
export { adaptFetchUrl } from "./utils.js";

if (typeof process !== "undefined") {
	const http = await import("http");
	const { WEB_APP_DEV_PROXY_HOST, WEB_APP_DEV_PROXY_PORT } = await import(
		"./constants.js"
	);
	const { runPreflightCheck } = await import("./preflight.js");
	const { setHeaders } = await import("./headers.js");
	const { urlIsValid } = await import("./validation.js");
	const { forwardRequest } = await import("./request.js");
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
				const targetUrl = req.url.replace(/^\//, "");

				logIncomingRequest(targetUrl, req.method);

				if (req.method === "OPTIONS") {
					runPreflightCheck(req, res);
					return;
				}

				setHeaders(res, req.headers.origin);

				if (!urlIsValid(targetUrl, res)) return;

				forwardRequest(targetUrl, req, res);
			})
			.listen(WEB_APP_DEV_PROXY_PORT, WEB_APP_DEV_PROXY_HOST, () => {
				logServerUrl();
			})
			.on("error", (err) => {
				logServerError(err);
			});
	} catch (err) {
		logServerError(err);
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

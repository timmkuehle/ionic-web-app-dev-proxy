export { IS_LOCAL_WEB_APP } from "./modules/constants";
export { adaptFetchUrl } from "./modules/utils";

if (typeof process !== "undefined") {
	const http = await import("http");
	const { WEB_APP_DEV_PROXY_HOST, WEB_APP_DEV_PROXY_PORT } = await import(
		"./modules/constants"
	);
	const { runPreflightCheck } = await import("./modules/preflight");
	const { setHeaders } = await import("./modules/headers");
	const { urlIsValid } = await import("./modules/validation");
	const { forwardRequest } = await import("./modules/request");
	const {
		logServerStartup,
		logServerUrl,
		logServerError,
		logIncomingRequest,
		logServerShutdown,
	} = await import("./modules/logFunctions");

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

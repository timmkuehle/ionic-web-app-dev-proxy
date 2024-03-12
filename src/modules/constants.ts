export const IS_WEBPACK_WATCH =
	typeof process !== "undefined" && process.argv.includes("webpackWatch");

export { WEB_APP_DEV_PROXY_HOST, WEB_APP_DEV_PROXY_PORT } from "../../index";

import { WEB_APP_DEV_PROXY_URL } from "../../index";

export { WEB_APP_DEV_PROXY_URL };

export const ALLOWED_ORIGINS = [WEB_APP_DEV_PROXY_URL];

export const MAX_REQUEST_BODY_SIZE_MB = 2;

export const IONIC_DEV_SERVER_RUNNING_REGEX = /Development server running!/;

export const IONIC_DEV_SERVER_LOCAL_REGEX = /Local: |\n/g;

export const IONIC_DEV_SERVER_HMR_REGEX = /hmr update/;

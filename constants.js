import { Capacitor } from "@capacitor/core";

const ENV = typeof process !== "undefined" ? process?.env : import.meta.env;

export const IS_LOCAL_WEB_APP =
	!Capacitor.isNativePlatform() &&
	(typeof ENV.MODE === "undefined" || ENV.MODE === "development");

export const IS_WEBPACK_WATCH =
	typeof process !== "undefined" && process.argv.includes("webpackWatch");

export const WEB_APP_DEV_PROXY_HOST = "localhost";

export const WEB_APP_DEV_PROXY_PORT = 8910;

export const WEB_APP_DEV_PROXY_URL = `http://${WEB_APP_DEV_PROXY_HOST}:${WEB_APP_DEV_PROXY_PORT}`;

export const ALLOWED_ORIGINS = [WEB_APP_DEV_PROXY_URL];

export const MAX_REQUEST_BODY_SIZE_MB = 2;

export const IONIC_DEV_SERVER_RUNNING_REGEX = /Development server running!/;

export const IONIC_DEV_SERVER_LOCAL_REGEX = /Local: |\n/g;

export const IONIC_DEV_SERVER_HMR_REGEX = /hmr update/;

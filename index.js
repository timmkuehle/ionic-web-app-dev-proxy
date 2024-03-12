import { Capacitor } from "@capacitor/core";

const ENV_MODE = import.meta.env?.MODE || process.env.NODE_ENV;

const IS_TEST_DOMAIN =
	typeof window !== "undefined" &&
	window.location.hostname.split(".").pop() === "test";

const IS_LOCAL_WEB_APP =
	!Capacitor.isNativePlatform() &&
	(ENV_MODE === "development" || IS_TEST_DOMAIN);

export const WEB_APP_DEV_PROXY_HOST = "localhost";

export const WEB_APP_DEV_PROXY_PORT = 8910;

export const WEB_APP_DEV_PROXY_URL = `http://${WEB_APP_DEV_PROXY_HOST}:${WEB_APP_DEV_PROXY_PORT}`;

export const adaptFetchUrl = (url) => {
	return IS_LOCAL_WEB_APP ? `${WEB_APP_DEV_PROXY_URL}/${url}` : url;
};

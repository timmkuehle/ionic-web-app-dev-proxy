import { Capacitor } from "@capacitor/core";

const ENV = import.meta.env;

export const IS_LOCAL_WEB_APP =
	!Capacitor.isNativePlatform() && ENV.MODE === "development";

export const WEB_APP_DEV_PROXY_HOST = "localhost";

export const WEB_APP_DEV_PROXY_PORT = 8910;

export const WEB_APP_DEV_PROXY_URL = `http://${WEB_APP_DEV_PROXY_HOST}:${WEB_APP_DEV_PROXY_PORT}`;

export const allowedOrigins = [WEB_APP_DEV_PROXY_URL, "http://localhost:5173"];

export const MAX_REQUEST_BODY_SIZE_MB = 2;

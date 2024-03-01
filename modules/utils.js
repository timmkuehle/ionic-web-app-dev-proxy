import { IS_LOCAL_WEB_APP, WEB_APP_DEV_PROXY_URL } from "./constants";

export const adaptFetchUrl = (url) => {
	return IS_LOCAL_WEB_APP ? `${WEB_APP_DEV_PROXY_URL}/${url}` : url;
};

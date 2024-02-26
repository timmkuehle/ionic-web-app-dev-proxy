/**
 * Prepends Ionic web app dev proxy URL to reroute fetch calls during local development
 *
 * Returns provided URL unaltered if rerouting is not necessary
 *
 * @param {string} url Fetch URL to adapt
 * @returns {string} Adapted Fetch URL
 */
export declare function adaptFetchUrl(url: string): string;

/**
 * Constant to check whether Ionic web app is running locally
 */
export declare const IS_LOCAL_WEB_APP: boolean;

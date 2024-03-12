/**
 * Constant for Ionic web app development proxy hostname
 */
export declare const WEB_APP_DEV_PROXY_HOST: string;

/**
 * Constant for Ionic web app development proxy port
 */
export declare const WEB_APP_DEV_PROXY_PORT: number;

/**
 * Constant for Ionic web app development proxy URL
 */
export declare const WEB_APP_DEV_PROXY_URL: string;

/**
 * Prepends Ionic web app dev proxy URL to reroute fetch calls during local development
 *
 * Returns provided URL unaltered if rerouting is not necessary
 *
 * @param {string} url Fetch URL to adapt
 * @returns {string} Adapted Fetch URL
 */
export declare function adaptFetchUrl(url: string): string;

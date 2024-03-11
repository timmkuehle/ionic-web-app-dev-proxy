#!/usr/bin/env node

import * as __WEBPACK_EXTERNAL_MODULE__capacitor_core_7603a9aa__ from "@capacitor/core";
import * as __WEBPACK_EXTERNAL_MODULE_colors__ from "colors";
import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ({

/***/ "./src/modules/logFunctions.ts":
/*!*************************************!*\
  !*** ./src/modules/logFunctions.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   logExecError: () => (/* binding */ logExecError),
/* harmony export */   logHmrUpdate: () => (/* binding */ logHmrUpdate),
/* harmony export */   logIncomingRequest: () => (/* binding */ logIncomingRequest),
/* harmony export */   logIonicServeAddress: () => (/* binding */ logIonicServeAddress),
/* harmony export */   logIonicServeError: () => (/* binding */ logIonicServeError),
/* harmony export */   logIonicServeShutdown: () => (/* binding */ logIonicServeShutdown),
/* harmony export */   logIonicServeStart: () => (/* binding */ logIonicServeStart),
/* harmony export */   logRequestResponse: () => (/* binding */ logRequestResponse),
/* harmony export */   logServerError: () => (/* binding */ logServerError),
/* harmony export */   logServerShutdown: () => (/* binding */ logServerShutdown),
/* harmony export */   logServerStartup: () => (/* binding */ logServerStartup),
/* harmony export */   logServerUrl: () => (/* binding */ logServerUrl)
/* harmony export */ });
/* harmony import */ var colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! colors */ "colors");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "./constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/modules/utils.ts");



const logServerStartup = () => {
    console.log(`${_constants__WEBPACK_IMPORTED_MODULE_1__.IS_WEBPACK_WATCH ? "\n" : ""}Starting proxy server for web app development ...\n`);
};
const logServerShutdown = () => {
    console.log(`\nShutting down proxy server for web app development ...\n`);
};
const logServerUrl = () => {
    console.log(`${colors__WEBPACK_IMPORTED_MODULE_0__["default"].green(`  ➜ ${_constants__WEBPACK_IMPORTED_MODULE_1__.WEB_APP_DEV_PROXY_URL}`)}\n`);
};
const logServerError = (err) => {
    var _a;
    let errMsg;
    switch (err.code) {
        case "EADDRINUSE":
            errMsg = `Error: listen EADDRINUSE: ${_constants__WEBPACK_IMPORTED_MODULE_1__.WEB_APP_DEV_PROXY_URL} is already in use.`;
            break;
        default:
            errMsg =
                ((_a = err.stack) === null || _a === void 0 ? void 0 : _a.split("\n")[0]) ||
                    `Error: ${err.code}: ${err.message}`;
    }
    console.log(colors__WEBPACK_IMPORTED_MODULE_0__["default"].red(`  ➜ ${errMsg}`));
};
const baseLog = colors__WEBPACK_IMPORTED_MODULE_0__["default"].grey(new Date().toLocaleTimeString(Intl.DateTimeFormat().resolvedOptions().locale)) + colors__WEBPACK_IMPORTED_MODULE_0__["default"].cyan.bold(" [webAppDevProxy] ");
const logIncomingRequest = (url, method) => {
    const isPreflight = method === "OPTIONS";
    console.log(baseLog +
        (isPreflight
            ? colors__WEBPACK_IMPORTED_MODULE_0__["default"].yellow("incoming preflight request ➜ ")
            : colors__WEBPACK_IMPORTED_MODULE_0__["default"].green("incoming request ➜ ")) +
        colors__WEBPACK_IMPORTED_MODULE_0__["default"].grey(`URL: ${(isPreflight ? colors__WEBPACK_IMPORTED_MODULE_0__["default"].yellow : colors__WEBPACK_IMPORTED_MODULE_0__["default"].green)(url)}` +
            (!isPreflight
                ? ` Method: ${colors__WEBPACK_IMPORTED_MODULE_0__["default"].green(method || "UNKNOWN")}`
                : "")));
};
const logRequestResponse = (status, errorMessage, isPreflight) => {
    console.log(baseLog +
        (isPreflight
            ? colors__WEBPACK_IMPORTED_MODULE_0__["default"].yellow("resolving preflight request ➜ ")
            : colors__WEBPACK_IMPORTED_MODULE_0__["default"].green("resolving request ➜ ")) +
        colors__WEBPACK_IMPORTED_MODULE_0__["default"].gray("Status: ") +
        (!(status >= 200 && status <= 299)
            ? colors__WEBPACK_IMPORTED_MODULE_0__["default"].red(`${status} - ${(0,_utils__WEBPACK_IMPORTED_MODULE_2__.getStatusDescription)(status)}` +
                (errorMessage ? `: ${errorMessage}` : ""))
            : colors__WEBPACK_IMPORTED_MODULE_0__["default"].green(`${status} - ${(0,_utils__WEBPACK_IMPORTED_MODULE_2__.getStatusDescription)(status)}`)));
};
const logIonicServeStart = () => {
    console.log(`${_constants__WEBPACK_IMPORTED_MODULE_1__.IS_WEBPACK_WATCH ? "\n" : ""}Starting Ionic app development server ...\n`);
};
const logIonicServeShutdown = () => {
    console.log("Shutting down Ionic app development server ...\n");
};
const logIonicServeAddress = (address) => {
    console.log(colors__WEBPACK_IMPORTED_MODULE_0__["default"].green(`  ➜ ${address}\n`));
};
const logIonicServeError = (err) => {
    console.log(colors__WEBPACK_IMPORTED_MODULE_0__["default"].red("  ➜ Error: Unable to serve Ionic App") +
        colors__WEBPACK_IMPORTED_MODULE_0__["default"].cyan(`\n\nNote: The ${colors__WEBPACK_IMPORTED_MODULE_0__["default"].yellow("serveWithProxy")} script is supposed to run in an Ionic project directory.\nPlease make sure that the Ionic CLI is installed on your system and that \nthis script is executed in the root directory of your Ionic project.\nIf you intend to run the proxy server only, use the ${colors__WEBPACK_IMPORTED_MODULE_0__["default"].yellow("startProxyServer")} script.\nFor more information, read the original error message below.\n\n`) +
        colors__WEBPACK_IMPORTED_MODULE_0__["default"].red(err.message));
};
const logHmrUpdate = (data) => {
    if (!_constants__WEBPACK_IMPORTED_MODULE_1__.IONIC_DEV_SERVER_HMR_REGEX.test(data)) {
        return;
    }
    console.log(data.replace(/^\[(vite|webpack)\] |\n/g, ""));
};
const logExecError = (err) => {
    var _a;
    console.log(colors__WEBPACK_IMPORTED_MODULE_0__["default"].red((((_a = err.stack) === null || _a === void 0 ? void 0 : _a.split("\n")[0]) ||
        `Error: ${err.code}: ` +
            err.message.replace(/ionic-web-app-dev-proxy|\[[^\]]+\]/g, (match) => colors__WEBPACK_IMPORTED_MODULE_0__["default"].yellow(match.replace(/[[\]]/g, "")))) +
        colors__WEBPACK_IMPORTED_MODULE_0__["default"].cyan("\n\nNote: Valid commands are " +
            _constants__WEBPACK_IMPORTED_MODULE_1__.SCRIPTS.reduce((prevScript, curScript, curIndex) => {
                return ((curIndex !== 0
                    ? prevScript +
                        (curIndex < _constants__WEBPACK_IMPORTED_MODULE_1__.SCRIPTS.length - 1
                            ? ", "
                            : " and ")
                    : "") + colors__WEBPACK_IMPORTED_MODULE_0__["default"].yellow(curScript));
            }, "") +
            "\n")));
};


/***/ }),

/***/ "./src/modules/utils.ts":
/*!******************************!*\
  !*** ./src/modules/utils.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkEnv: () => (/* binding */ checkEnv),
/* harmony export */   getStatusDescription: () => (/* binding */ getStatusDescription),
/* harmony export */   stringifyData: () => (/* binding */ stringifyData)
/* harmony export */ });
const checkEnv = () => {
    if (typeof process === "undefined") {
        throw new Error("Error: Incompatible environment: This script is supposed to run in a nodeJS environment");
    }
};
const getStatusDescription = (status) => {
    switch (status) {
        case 200:
            return "OK";
        case 400:
            return "Bad Request";
        case 401:
            return "Unauthorized";
        case 403:
            return "Forbidden";
        case 404:
            return "Not Found";
        case 413:
            return "Content Too Large";
        case 500:
            return "Internal Server Error";
        default:
            return "Unknown Error";
    }
};
const stringifyData = (data, contentType) => {
    if (contentType === "application/json") {
        return JSON.stringify(data);
    }
    return data.toString();
};


/***/ }),

/***/ "@capacitor/core":
/*!**********************************!*\
  !*** external "@capacitor/core" ***!
  \**********************************/
/***/ ((module) => {

var x = (y) => {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = (x) => (() => (x))
module.exports = __WEBPACK_EXTERNAL_MODULE__capacitor_core_7603a9aa__;

/***/ }),

/***/ "colors":
/*!*************************!*\
  !*** external "colors" ***!
  \*************************/
/***/ ((module) => {

var x = (y) => {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = (x) => (() => (x))
module.exports = __WEBPACK_EXTERNAL_MODULE_colors__;

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("child_process");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("path");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("url");

/***/ }),

/***/ "./constants.js":
/*!**********************!*\
  !*** ./constants.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ALLOWED_ORIGINS: () => (/* binding */ ALLOWED_ORIGINS),
/* harmony export */   IONIC_DEV_SERVER_HMR_REGEX: () => (/* binding */ IONIC_DEV_SERVER_HMR_REGEX),
/* harmony export */   IONIC_DEV_SERVER_LOCAL_REGEX: () => (/* binding */ IONIC_DEV_SERVER_LOCAL_REGEX),
/* harmony export */   IONIC_DEV_SERVER_RUNNING_REGEX: () => (/* binding */ IONIC_DEV_SERVER_RUNNING_REGEX),
/* harmony export */   IS_LOCAL_WEB_APP: () => (/* binding */ IS_LOCAL_WEB_APP),
/* harmony export */   IS_WEBPACK_WATCH: () => (/* binding */ IS_WEBPACK_WATCH),
/* harmony export */   MAX_REQUEST_BODY_SIZE_MB: () => (/* binding */ MAX_REQUEST_BODY_SIZE_MB),
/* harmony export */   SCRIPTS: () => (/* binding */ SCRIPTS),
/* harmony export */   WEB_APP_DEV_PROXY_HOST: () => (/* binding */ WEB_APP_DEV_PROXY_HOST),
/* harmony export */   WEB_APP_DEV_PROXY_PORT: () => (/* binding */ WEB_APP_DEV_PROXY_PORT),
/* harmony export */   WEB_APP_DEV_PROXY_URL: () => (/* binding */ WEB_APP_DEV_PROXY_URL),
/* harmony export */   __dirname: () => (/* binding */ __dirname),
/* harmony export */   __filename: () => (/* binding */ __filename)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/core */ "@capacitor/core");



const __filename = (0,url__WEBPACK_IMPORTED_MODULE_1__.fileURLToPath)("file:///Users/timmoritzkuehle/Library/CloudStorage/Dropbox/Dokumente/Coding/ionic-web-app-dev-proxy/Code/constants.js");
const __dirname = path__WEBPACK_IMPORTED_MODULE_0__.dirname(__filename);
const ENV = typeof process !== "undefined" ? process === null || process === void 0 ? void 0 : process.env : /* unsupported import.meta.env */ undefined;
const IS_LOCAL_WEB_APP = !_capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.isNativePlatform() &&
    (typeof ENV.MODE === "undefined" || ENV.MODE === "development");
const IS_WEBPACK_WATCH = typeof process !== "undefined" && process.argv.includes("--webpack-watch");
const WEB_APP_DEV_PROXY_HOST = "localhost";
const WEB_APP_DEV_PROXY_PORT = 8910;
const WEB_APP_DEV_PROXY_URL = `http://${WEB_APP_DEV_PROXY_HOST}:${WEB_APP_DEV_PROXY_PORT}`;
const ALLOWED_ORIGINS = [WEB_APP_DEV_PROXY_URL];
const MAX_REQUEST_BODY_SIZE_MB = 2;
const IONIC_DEV_SERVER_RUNNING_REGEX = /Development server running!/;
const IONIC_DEV_SERVER_LOCAL_REGEX = /Local: |\n/g;
const IONIC_DEV_SERVER_HMR_REGEX = /hmr update/;
const SCRIPTS = ["serveWithProxy", "startProxyServer"];


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./constants.js");
/* harmony import */ var _modules_logFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/logFunctions */ "./src/modules/logFunctions.ts");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! child_process */ "child_process");
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_3__);





if (process.argv.length <= 2) {
    (0,_modules_logFunctions__WEBPACK_IMPORTED_MODULE_1__.logExecError)({
        code: "EMISSARG",
        message: "Missing argument: ionic-web-app-dev-proxy needs to be provided with a command to execute"
    });
    process.exit(1);
}
const execScript = process.argv[2];
if (!_constants__WEBPACK_IMPORTED_MODULE_0__.SCRIPTS.includes(execScript)) {
    (0,_modules_logFunctions__WEBPACK_IMPORTED_MODULE_1__.logExecError)({
        code: "EINVARG",
        message: `Invalid argument: [${execScript}] is not a valid command`
    });
    process.exit(1);
}
(0,child_process__WEBPACK_IMPORTED_MODULE_3__.fork)(path__WEBPACK_IMPORTED_MODULE_2___default().resolve(_constants__WEBPACK_IMPORTED_MODULE_0__.__dirname, `scripts/${execScript}.js`));

})();


//# sourceMappingURL=exec.js.map
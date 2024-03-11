#!/usr/bin/env node

import * as __WEBPACK_EXTERNAL_MODULE__capacitor_core_7603a9aa__ from "@capacitor/core";
import * as __WEBPACK_EXTERNAL_MODULE_colors__ from "colors";
import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ({

/***/ "./src/modules/headers.ts":
/*!********************************!*\
  !*** ./src/modules/headers.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setHeaders: () => (/* binding */ setHeaders)
/* harmony export */ });
const setHeaders = (res, origin = null) => {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
};


/***/ }),

/***/ "./src/modules/ionicServe.ts":
/*!***********************************!*\
  !*** ./src/modules/ionicServe.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getIonicServeAddress: () => (/* binding */ getIonicServeAddress),
/* harmony export */   shutdownIonicServe: () => (/* binding */ shutdownIonicServe)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./constants.js");
/* harmony import */ var _logFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logFunctions */ "./src/modules/logFunctions.ts");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation */ "./src/modules/validation.ts");



const getIonicServeAddress = (data, ionicServeProcess) => {
    const ionicDevServerUrlMatches = data.match(/Local: .*\n/);
    if (!ionicDevServerUrlMatches || !ionicDevServerUrlMatches.length) {
        shutdownIonicServe(ionicServeProcess, "SIGTERM", {
            message: "Error: Unable to retrieve local Ionic app development server URL"
        });
        return null;
    }
    const ionicServeAddress = ionicDevServerUrlMatches[0].replace(_constants__WEBPACK_IMPORTED_MODULE_0__.IONIC_DEV_SERVER_LOCAL_REGEX, "");
    if (!(0,_validation__WEBPACK_IMPORTED_MODULE_2__.serverAddressIsValid)(ionicServeAddress)) {
        shutdownIonicServe(ionicServeProcess, "SIGTERM", {
            message: `Error: [${ionicServeAddress}] is not a valid Ionic app development server address`
        });
        return null;
    }
    return ionicServeAddress;
};
const shutdownIonicServe = (ionicServeProcess, signal, error) => {
    if (error) {
        (0,_logFunctions__WEBPACK_IMPORTED_MODULE_1__.logIonicServeError)(error);
    }
    if (!ionicServeProcess || ionicServeProcess.killed) {
        (0,_logFunctions__WEBPACK_IMPORTED_MODULE_1__.logIonicServeShutdown)(false);
        return;
    }
    ionicServeProcess.kill(signal);
};


/***/ }),

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
/* harmony export */   logProxyServerError: () => (/* binding */ logProxyServerError),
/* harmony export */   logProxyServerShutdown: () => (/* binding */ logProxyServerShutdown),
/* harmony export */   logProxyServerStartup: () => (/* binding */ logProxyServerStartup),
/* harmony export */   logProxyServerUrl: () => (/* binding */ logProxyServerUrl),
/* harmony export */   logRequestResponse: () => (/* binding */ logRequestResponse)
/* harmony export */ });
/* harmony import */ var colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! colors */ "colors");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "./constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/modules/utils.ts");



const logProxyServerStartup = () => {
    console.log(`${_constants__WEBPACK_IMPORTED_MODULE_1__.IS_WEBPACK_WATCH ? "\n" : ""}Starting proxy server for web app development ...\n`);
};
const logProxyServerShutdown = (isRunning, err) => {
    if (isRunning === false) {
        console.log("Proxy server is not running\n");
        return;
    }
    console.log("Shutting down proxy server for web app development ... " +
        (err ? colors__WEBPACK_IMPORTED_MODULE_0__["default"].red(`\nError: ${err === null || err === void 0 ? void 0 : err.message}`) : "") +
        "\n");
};
const logProxyServerUrl = () => {
    console.log(`${colors__WEBPACK_IMPORTED_MODULE_0__["default"].green(`  ➜ ${_constants__WEBPACK_IMPORTED_MODULE_1__.WEB_APP_DEV_PROXY_URL}`)}\n`);
};
const logProxyServerError = (err, useBaseLog) => {
    var _a, _b;
    let errMsg;
    switch (err.code) {
        case "EADDRINUSE":
            errMsg = `Error: listen EADDRINUSE: [${_constants__WEBPACK_IMPORTED_MODULE_1__.WEB_APP_DEV_PROXY_URL}] is already in use.`;
            break;
        default:
            errMsg =
                ((_b = (_a = err.stack) === null || _a === void 0 ? void 0 : _a.split("\n")) === null || _b === void 0 ? void 0 : _b[0]) ||
                    `Error: ${err.code}: ${err.message}`;
    }
    console.log(colors__WEBPACK_IMPORTED_MODULE_0__["default"].red((useBaseLog ? baseLog : "  ➜ ") +
        highlightLogs(errMsg) +
        (useBaseLog ? "" : "\n")));
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
const logIonicServeShutdown = (isRunning) => {
    if (isRunning === false) {
        console.log("Ionic app development server is not running\n");
        return;
    }
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
const logExecError = (err, note) => {
    var _a;
    console.log(colors__WEBPACK_IMPORTED_MODULE_0__["default"].red((((_a = err.stack) === null || _a === void 0 ? void 0 : _a.split("\n")[0]) ||
        `Error: ${err.code}: ${highlightLogs(err.message)}`) +
        (note ? colors__WEBPACK_IMPORTED_MODULE_0__["default"].cyan(`\n\n${highlightLogs(note)}\n`) : "")));
};
const highlightLogs = (log) => log.replace(/ionic-web-app-dev-proxy|\[[^\]]+\]/g, (match) => colors__WEBPACK_IMPORTED_MODULE_0__["default"].yellow(match.replace(/[[\]]/g, "")));


/***/ }),

/***/ "./src/modules/preflight.ts":
/*!**********************************!*\
  !*** ./src/modules/preflight.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runPreflightCheck: () => (/* binding */ runPreflightCheck)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./constants.js");
/* harmony import */ var _headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./headers */ "./src/modules/headers.ts");
/* harmony import */ var _resolve__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resolve */ "./src/modules/resolve.ts");



const runPreflightCheck = (req, res, ionicServeAddress) => {
    const { origin } = req.headers;
    (0,_headers__WEBPACK_IMPORTED_MODULE_1__.setHeaders)(res);
    let error = null;
    if (!origin) {
        error = {
            code: 400,
            message: "Proxy server is unable to determine request origin"
        };
    }
    else if (![..._constants__WEBPACK_IMPORTED_MODULE_0__.ALLOWED_ORIGINS, ionicServeAddress].includes(origin)) {
        error = {
            code: 403,
            message: `Origin [${origin}] is not allowed to access proxy server`
        };
    }
    if (error) {
        (0,_resolve__WEBPACK_IMPORTED_MODULE_2__.resolveWithError)(req, res, error.code, error.message);
        return;
    }
    (0,_resolve__WEBPACK_IMPORTED_MODULE_2__.resolveRequest)(res, 200);
};


/***/ }),

/***/ "./src/modules/proxyServer.ts":
/*!************************************!*\
  !*** ./src/modules/proxyServer.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   shutdownProxyServer: () => (/* binding */ shutdownProxyServer),
/* harmony export */   startProxyServer: () => (/* binding */ startProxyServer)
/* harmony export */ });
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "./constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/modules/utils.ts");
/* harmony import */ var _preflight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./preflight */ "./src/modules/preflight.ts");
/* harmony import */ var _headers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./headers */ "./src/modules/headers.ts");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./validation */ "./src/modules/validation.ts");
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./request */ "./src/modules/request.ts");
/* harmony import */ var _logFunctions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./logFunctions */ "./src/modules/logFunctions.ts");








const startProxyServer = (ionicServeAddress) => {
    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.checkEnv)();
    (0,_logFunctions__WEBPACK_IMPORTED_MODULE_7__.logProxyServerStartup)();
    let proxyServer = null;
    try {
        if (!(0,_validation__WEBPACK_IMPORTED_MODULE_5__.serverAddressIsValid)(ionicServeAddress)) {
            throw new Error(`Invalid Parameter: [${ionicServeAddress}] is not a valid Ionic app development server address`);
        }
        proxyServer = http__WEBPACK_IMPORTED_MODULE_0___default().createServer((req, res) => {
            var _a;
            const targetUrl = ((_a = req.url) === null || _a === void 0 ? void 0 : _a.replace(/^\//, "")) || "/";
            (0,_logFunctions__WEBPACK_IMPORTED_MODULE_7__.logIncomingRequest)(targetUrl, req.method);
            if (req.method === "OPTIONS") {
                (0,_preflight__WEBPACK_IMPORTED_MODULE_3__.runPreflightCheck)(req, res, ionicServeAddress);
                return;
            }
            (0,_headers__WEBPACK_IMPORTED_MODULE_4__.setHeaders)(res, req.headers.origin);
            if (!(0,_validation__WEBPACK_IMPORTED_MODULE_5__.urlIsValid)(req, res, targetUrl))
                return;
            (0,_request__WEBPACK_IMPORTED_MODULE_6__.forwardRequest)(req, res, targetUrl);
        })
            .listen(_constants__WEBPACK_IMPORTED_MODULE_1__.WEB_APP_DEV_PROXY_PORT, _constants__WEBPACK_IMPORTED_MODULE_1__.WEB_APP_DEV_PROXY_HOST, () => {
            (0,_logFunctions__WEBPACK_IMPORTED_MODULE_7__.logProxyServerUrl)();
        })
            .on("error", (err) => {
            (0,_logFunctions__WEBPACK_IMPORTED_MODULE_7__.logProxyServerError)(err, true);
        });
    }
    catch (err) {
        shutdownProxyServer(proxyServer, err);
    }
    return proxyServer;
};
const shutdownProxyServer = (proxyServer, err) => {
    if (err) {
        (0,_logFunctions__WEBPACK_IMPORTED_MODULE_7__.logProxyServerError)(err);
    }
    if (!proxyServer || !proxyServer.listening) {
        (0,_logFunctions__WEBPACK_IMPORTED_MODULE_7__.logProxyServerShutdown)(false);
        return;
    }
    proxyServer.close((err) => {
        (0,_logFunctions__WEBPACK_IMPORTED_MODULE_7__.logProxyServerShutdown)(true, err);
        process.exit(err ? 1 : 0);
    });
};


/***/ }),

/***/ "./src/modules/request.ts":
/*!********************************!*\
  !*** ./src/modules/request.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   forwardRequest: () => (/* binding */ forwardRequest)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./constants.js");
/* harmony import */ var _resolve__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolve */ "./src/modules/resolve.ts");


const forwardRequest = (req, res, url) => {
    const reqContentType = req.headers["content-type"] || "application/json";
    let reqBody = "";
    let reqBodySize = 0;
    req.on("data", (chunk) => {
        reqBodySize += chunk.length;
        if (reqBodySize > _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_REQUEST_BODY_SIZE_MB * 1024 * 1024) {
            const errMsg = "Request body size exceeds proxy server maximum limit (" +
                _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_REQUEST_BODY_SIZE_MB +
                "MB)";
            (0,_resolve__WEBPACK_IMPORTED_MODULE_1__.resolveWithError)(req, res, 413, errMsg, `HTTP Error: 413: ${errMsg}`);
            return;
        }
        reqBody += chunk;
    });
    req.on("end", async () => {
        try {
            const response = await fetch(url, {
                method: req.method,
                headers: {
                    "Content-Type": reqContentType
                },
                body: reqBody
            });
            const resContentType = response.headers.get("content-type") || "application/json";
            const data = reqContentType === "application/json"
                ? await response.json()
                : response.text();
            (0,_resolve__WEBPACK_IMPORTED_MODULE_1__.resolveRequest)(res, response.status, {
                contentType: resContentType,
                data
            });
        }
        catch (err) {
            const { stack, code, message } = err;
            const errMsg = (stack === null || stack === void 0 ? void 0 : stack.split("\n")[0]) || `Error: ${code}: ${message}`;
            (0,_resolve__WEBPACK_IMPORTED_MODULE_1__.resolveWithError)(req, res, 500, errMsg, stack);
        }
    });
};


/***/ }),

/***/ "./src/modules/resolve.ts":
/*!********************************!*\
  !*** ./src/modules/resolve.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveRequest: () => (/* binding */ resolveRequest),
/* harmony export */   resolveWithError: () => (/* binding */ resolveWithError)
/* harmony export */ });
/* harmony import */ var _logFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logFunctions */ "./src/modules/logFunctions.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/modules/utils.ts");


const resolveRequest = (res, status, body) => {
    const contentType = (body === null || body === void 0 ? void 0 : body.contentType) || "application/json";
    (0,_logFunctions__WEBPACK_IMPORTED_MODULE_0__.logRequestResponse)(status);
    if (body) {
        res.setHeader("Content-Type", contentType);
    }
    res.writeHead(status);
    res.end(body ? (0,_utils__WEBPACK_IMPORTED_MODULE_1__.stringifyData)(body.data, contentType) : null);
};
const resolveWithError = (req, res, status, message, debug = null) => {
    (0,_logFunctions__WEBPACK_IMPORTED_MODULE_0__.logRequestResponse)(status, message);
    res.setHeader("Content-Type", "application/json");
    res.writeHead(status);
    res.end(JSON.stringify({
        error: {
            code: status,
            http_status: status,
            message: `${status}: ${(0,_utils__WEBPACK_IMPORTED_MODULE_1__.getStatusDescription)(status)}`,
            data: debug ? { debug } : {},
        },
    }));
    req.destroy();
};


/***/ }),

/***/ "./src/modules/serveWithProxy.ts":
/*!***************************************!*\
  !*** ./src/modules/serveWithProxy.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   serveWithProxy: () => (/* binding */ serveWithProxy)
/* harmony export */ });
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! child_process */ "child_process");
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "./constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/modules/utils.ts");
/* harmony import */ var _logFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logFunctions */ "./src/modules/logFunctions.ts");
/* harmony import */ var _proxyServer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./proxyServer */ "./src/modules/proxyServer.ts");
/* harmony import */ var _ionicServe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ionicServe */ "./src/modules/ionicServe.ts");






const serveWithProxy = () => {
    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.checkEnv)();
    (0,_logFunctions__WEBPACK_IMPORTED_MODULE_3__.logIonicServeStart)();
    const ionicServe = (0,child_process__WEBPACK_IMPORTED_MODULE_0__.spawn)("ionic", ["serve", "--no-open"]);
    ionicServe.on("error", (err) => {
        (0,_logFunctions__WEBPACK_IMPORTED_MODULE_3__.logIonicServeError)(err);
    });
    ionicServe.stderr.on("data", (err) => {
        (0,_logFunctions__WEBPACK_IMPORTED_MODULE_3__.logIonicServeError)({ message: err.toString() });
    });
    let proxyServer = null;
    ionicServe.stdout.on("data", (data) => {
        const stringifiedData = data.toString();
        if (_constants__WEBPACK_IMPORTED_MODULE_1__.IONIC_DEV_SERVER_RUNNING_REGEX.test(data)) {
            const ionicServeAddress = (0,_ionicServe__WEBPACK_IMPORTED_MODULE_5__.getIonicServeAddress)(stringifiedData, ionicServe);
            if (!ionicServeAddress)
                return;
            (0,_logFunctions__WEBPACK_IMPORTED_MODULE_3__.logIonicServeAddress)(ionicServeAddress);
            proxyServer = (0,_proxyServer__WEBPACK_IMPORTED_MODULE_4__.startProxyServer)(ionicServeAddress);
            if (!proxyServer) {
                (0,_ionicServe__WEBPACK_IMPORTED_MODULE_5__.shutdownIonicServe)(ionicServe, "SIGTERM");
            }
            return;
        }
        (0,_logFunctions__WEBPACK_IMPORTED_MODULE_3__.logHmrUpdate)(stringifiedData);
    });
    ionicServe.on("close", () => {
        (0,_logFunctions__WEBPACK_IMPORTED_MODULE_3__.logIonicServeShutdown)();
        if (proxyServer)
            (0,_proxyServer__WEBPACK_IMPORTED_MODULE_4__.shutdownProxyServer)(proxyServer);
    });
    return ionicServe;
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

/***/ "./src/modules/validation.ts":
/*!***********************************!*\
  !*** ./src/modules/validation.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   serverAddressIsValid: () => (/* binding */ serverAddressIsValid),
/* harmony export */   urlIsValid: () => (/* binding */ urlIsValid)
/* harmony export */ });
/* harmony import */ var _resolve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolve */ "./src/modules/resolve.ts");

const urlIsValid = (req, res, url) => {
    if (!/^https?:\/\/(www\.)?([\w0-9-]+\.)+[a-z]{2,63}(\/[\w0-9-]+)*(\.[\w0-9]+)*([?&][\w0-9-_]+=[\w0-9-_%]*)*$/.test(url)) {
        (0,_resolve__WEBPACK_IMPORTED_MODULE_0__.resolveWithError)(req, res, 400, "Target URL is invalid");
        return false;
    }
    return true;
};
const serverAddressIsValid = (url) => {
    if (!/^(https?:\/\/(www\.)?([\w0-9-]+\.?)+([a-z]{2,63})?|([0-9]{1,3}\.){3}[0-9]{1,3}):[0-9]{1,5}$/.test(url)) {
        return false;
    }
    return true;
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

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("http");

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
/* harmony import */ var _modules_logFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/logFunctions */ "./src/modules/logFunctions.ts");
/* harmony import */ var _modules_serveWithProxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/serveWithProxy */ "./src/modules/serveWithProxy.ts");
/* harmony import */ var _modules_ionicServe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/ionicServe */ "./src/modules/ionicServe.ts");
/* harmony import */ var _modules_proxyServer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/proxyServer */ "./src/modules/proxyServer.ts");




if (process.argv.length <= 2) {
    (0,_modules_logFunctions__WEBPACK_IMPORTED_MODULE_0__.logExecError)({
        code: "EMISSARG",
        message: "Missing argument: ionic-web-app-dev-proxy needs to be provided with a command to execute"
    }, "Note: Valid commands are [serveWithProxy] and [startProxyServer]");
    process.exit(1);
}
let ionicServe;
let proxyServer;
switch (process.argv[2]) {
    case "serveWithProxy":
        ionicServe = (0,_modules_serveWithProxy__WEBPACK_IMPORTED_MODULE_1__.serveWithProxy)();
        break;
    case "startProxyServer": {
        if (process.argv.length <= 3) {
            (0,_modules_logFunctions__WEBPACK_IMPORTED_MODULE_0__.logExecError)({
                code: "ENOIONADDRARG",
                message: "Missing argument: [startProxyServer] has to be provided with an Ionic serve address to resolve preflight requests"
            }, "Example: ionic-web-app-dev-proxy [startProxyServer http://localhost:8100]");
            break;
        }
        proxyServer = (0,_modules_proxyServer__WEBPACK_IMPORTED_MODULE_3__.startProxyServer)(process.argv[3]);
        break;
    }
    default: {
        (0,_modules_logFunctions__WEBPACK_IMPORTED_MODULE_0__.logExecError)({
            code: "EINVARG",
            message: `Invalid argument: [${process.argv[2]}] is not a valid command`
        });
        process.exit(1);
    }
}
process.on("SIGINT", () => {
    process.stdout.write("\n");
    if (ionicServe)
        (0,_modules_ionicServe__WEBPACK_IMPORTED_MODULE_2__.shutdownIonicServe)(ionicServe, "SIGINT");
    if (proxyServer)
        (0,_modules_proxyServer__WEBPACK_IMPORTED_MODULE_3__.shutdownProxyServer)(proxyServer);
});
process.on("SIGTERM", () => {
    if (ionicServe)
        (0,_modules_ionicServe__WEBPACK_IMPORTED_MODULE_2__.shutdownIonicServe)(ionicServe, "SIGTERM");
    if (proxyServer)
        (0,_modules_proxyServer__WEBPACK_IMPORTED_MODULE_3__.shutdownProxyServer)(proxyServer);
});

})();


//# sourceMappingURL=exec.js.map
(()=>{"use strict";var e={n:o=>{var r=o&&o.__esModule?()=>o.default:()=>o;return e.d(r,{a:r}),r},d:(o,r)=>{for(var t in r)e.o(r,t)&&!e.o(o,t)&&Object.defineProperty(o,t,{enumerable:!0,get:r[t]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o)};const o=require("child_process"),r=require("colors");var t=e.n(r);const n=require("@capacitor/core"),s="undefined"!=typeof process?null===process||void 0===process?void 0:process.env:void 0;!n.Capacitor.isNativePlatform()&&(void 0===s.MODE||s.MODE),"undefined"!=typeof process&&process.argv.includes("webpack --watch"),t().grey((new Date).toLocaleTimeString(Intl.DateTimeFormat().resolvedOptions().locale)),t().cyan(" [webAppDevProxy] "),(0,o.exec)("ionic serve",((e,o,r)=>{e&&(e=>{console.log(t().red("  ➜ Error: Unable to serve Ionic App")+t().cyan(`\n\nNote: The ${t().yellow("serveWithProxy")} script is supposed to run in an Ionic project directory.\nPlease make sure that the Ionic CLI is installed on your system and that \nthis script is executed in the root directory of your Ionic project.\nIf you intend to run the proxy server only, use the ${t().yellow("startServer")} script.\nFor more information, read the original error message below:\n\n`)+t().red(e.message))})(e),console.log("Guckste da:",o)}))})();
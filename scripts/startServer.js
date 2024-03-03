(()=>{"use strict";var e={n:o=>{var t=o&&o.__esModule?()=>o.default:()=>o;return e.d(t,{a:t}),t},d:(o,t)=>{for(var r in t)e.o(t,r)&&!e.o(o,r)&&Object.defineProperty(o,r,{enumerable:!0,get:t[r]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o)};const o=require("http");var t=e.n(o);const r=require("@capacitor/core"),n="undefined"!=typeof process?null===process||void 0===process?void 0:process.env:void 0,s=(!r.Capacitor.isNativePlatform()&&(void 0===n.MODE||n.MODE),"undefined"!=typeof process&&process.argv.includes("webpack --watch")),a="localhost",i=`http://${a}:8910`,l=[i,"http://localhost:5173"],c=(e,o=null)=>{e.setHeader("Access-Control-Allow-Origin",o||"*"),e.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization")},d=require("colors");var p=e.n(d);const u=e=>{switch(e){case 200:return"OK";case 400:return"Bad Request";case 401:return"Unauthorized";case 403:return"Forbidden";case 404:return"Not Found";case 413:return"Content Too Large";case 500:return"Internal Server Error";default:return"Unknown Error"}},g=()=>{console.log("\nShutting down proxy server for web app development ...\n")},y=e=>{var o;let t;t="EADDRINUSE"===e.code?`Error: listen EADDRINUSE: ${i} is already in use.`:(null===(o=e.stack)||void 0===o?void 0:o.split("\n")[0])||`Error: ${e.code}: ${e.message}`,console.log(p().red(`  ➜ ${t}\n`))},v=p().grey((new Date).toLocaleTimeString(Intl.DateTimeFormat().resolvedOptions().locale))+p().cyan(" [webAppDevProxy] "),h=(e,o,t)=>{console.log(v+(t?p().yellow("resolving preflight request ➜ "):p().green("resolving request ➜ "))+p().gray("Status: ")+(e>=200&&e<=299?p().green(`${e} - ${u(e)}`):p().red(`${e} - ${u(e)}`+(o?`: ${o}`:""))))},w=(e,o,t)=>{const r=(null==t?void 0:t.contentType)||"application/json";h(o),t&&e.setHeader("Content-Type",r),e.writeHead(o),e.end(t?((e,o)=>"application/json"===o?JSON.stringify(e):e.toString())(t.data,r):null)},m=(e,o,t,r,n=null)=>{h(t,r),o.setHeader("Content-Type","application/json"),o.writeHead(t),o.end(JSON.stringify({error:{code:t,http_status:t,message:`${t}: ${u(t)}`,data:n?{debug:n}:{}}})),e.destroy()};if("undefined"!=typeof process){console.log((s?"\n":"")+"Starting proxy server for web app development ...\n");try{t().createServer(((e,o)=>{var t;const r=(null===(t=e.url)||void 0===t?void 0:t.replace(/^\//,""))||"/";((e,o)=>{const t="OPTIONS"===o;console.log(v+(t?p().yellow("incoming preflight request ➜ "):p().green("incoming request ➜ "))+p().grey(`URL: ${(t?p().yellow:p().green)(e)}`+(t?"":` Method: ${p().green(o||"UNKNOWN")}`)))})(r,e.method),"OPTIONS"!==e.method?(c(o,e.headers.origin),((e,o,t)=>!!/^http(s*):\/\/(www\.)?([\w0-9-]+\.)+[a-z]{2,63}(\/[\w0-9-]+)*(\.[\w0-9]+)*([?&][\w0-9-_]+=[\w0-9-_%]*)*$/.test(t)||(m(e,o,400,"Target URL is invalid"),!1))(e,o,r)&&((e,o,t)=>{const r=e.headers["content-type"]||"application/json";let n="",s=0;e.on("data",(t=>{if(s+=t.length,s>2097152){const t="Request body size exceeds proxy server maximum limit (2MB)";m(e,o,413,t,`HTTP Error: 413: ${t}`)}else n+=t})),e.on("end",(async()=>{try{const s=await fetch(t,{method:e.method,headers:{"Content-Type":r},body:n}),a=s.headers.get("content-type")||"application/json",i="application/json"===r?await s.json():s.text();w(o,s.status,{contentType:a,data:i})}catch(t){const{stack:r,code:n,message:s}=t,a=(null==r?void 0:r.split("\n")[0])||`Error: ${n}: ${s}`;m(e,o,500,a,r)}}))})(e,o,r)):((e,o)=>{const{origin:t}=e.headers;c(o);let r=null;t?l.includes(t)||(r={code:403,message:`Origin [${t}] is not allowed to access proxy server`}):r={code:400,message:"Proxy server is unable to determine request origin"},r?m(e,o,r.code,r.message):w(o,200)})(e,o)})).listen(8910,a,(()=>{console.log(`${p().green(`  ➜ ${i}`)}\n`)})).on("error",(e=>{y(e)}))}catch(e){y(e)}process.on("SIGINT",(()=>{g(),process.exit(0)})),process.on("SIGTERM",(()=>{g(),process.exit(0)}))}})();
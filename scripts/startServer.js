import{createRequire as e}from"module";import*as t from"@capacitor/core";import*as o from"colors";var r={n:e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},d:(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const n=e(import.meta.url)("http");var a=r.n(n);const s=(g={Capacitor:()=>t.Capacitor},f={},r.d(f,g),f),l="undefined"!=typeof process?null===process||void 0===process?void 0:process.env:void 0,i=(!s.Capacitor.isNativePlatform()&&(void 0===l.MODE||l.MODE),"undefined"!=typeof process&&process.argv.includes("webpack --watch")),d="localhost",c=`http://${d}:8910`,p=[c,"http://localhost:8100"],u=(e,t=null)=>{e.setHeader("Access-Control-Allow-Origin",t||"*"),e.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization")};var g,f;const y=(e=>{var t={};return r.d(t,e),t})({default:()=>o.default}),v=e=>{switch(e){case 200:return"OK";case 400:return"Bad Request";case 401:return"Unauthorized";case 403:return"Forbidden";case 404:return"Not Found";case 413:return"Content Too Large";case 500:return"Internal Server Error";default:return"Unknown Error"}},m=()=>{console.log("\nShutting down proxy server for web app development ...\n")},h=e=>{var t;let o;o="EADDRINUSE"===e.code?`Error: listen EADDRINUSE: ${c} is already in use.`:(null===(t=e.stack)||void 0===t?void 0:t.split("\n")[0])||`Error: ${e.code}: ${e.message}`,console.log(y.default.red(`  ➜ ${o}\n`))},w=y.default.grey((new Date).toLocaleTimeString(Intl.DateTimeFormat().resolvedOptions().locale))+y.default.cyan(" [webAppDevProxy] "),$=(e,t,o)=>{console.log(w+(o?y.default.yellow("resolving preflight request ➜ "):y.default.green("resolving request ➜ "))+y.default.gray("Status: ")+(e>=200&&e<=299?y.default.green(`${e} - ${v(e)}`):y.default.red(`${e} - ${v(e)}`+(t?`: ${t}`:""))))},O=(e,t,o)=>{const r=(null==o?void 0:o.contentType)||"application/json";$(t),o&&e.setHeader("Content-Type",r),e.writeHead(t),e.end(o?((e,t)=>"application/json"===t?JSON.stringify(e):e.toString())(o.data,r):null)},T=(e,t,o,r,n=null)=>{$(o,r),t.setHeader("Content-Type","application/json"),t.writeHead(o),t.end(JSON.stringify({error:{code:o,http_status:o,message:`${o}: ${v(o)}`,data:n?{debug:n}:{}}})),e.destroy()};if("undefined"!=typeof process){console.log((i?"\n":"")+"Starting proxy server for web app development ...\n");try{a().createServer(((e,t)=>{var o;const r=(null===(o=e.url)||void 0===o?void 0:o.replace(/^\//,""))||"/";((e,t)=>{const o="OPTIONS"===t;console.log(w+(o?y.default.yellow("incoming preflight request ➜ "):y.default.green("incoming request ➜ "))+y.default.grey(`URL: ${(o?y.default.yellow:y.default.green)(e)}`+(o?"":` Method: ${y.default.green(t||"UNKNOWN")}`)))})(r,e.method),"OPTIONS"!==e.method?(u(t,e.headers.origin),((e,t,o)=>!!/^http(s*):\/\/(www\.)?([\w0-9-]+\.)+[a-z]{2,63}(\/[\w0-9-]+)*(\.[\w0-9]+)*([?&][\w0-9-_]+=[\w0-9-_%]*)*$/.test(o)||(T(e,t,400,"Target URL is invalid"),!1))(e,t,r)&&((e,t,o)=>{const r=e.headers["content-type"]||"application/json";let n="",a=0;e.on("data",(o=>{if(a+=o.length,a>2097152){const o="Request body size exceeds proxy server maximum limit (2MB)";T(e,t,413,o,`HTTP Error: 413: ${o}`)}else n+=o})),e.on("end",(async()=>{try{const a=await fetch(o,{method:e.method,headers:{"Content-Type":r},body:n}),s=a.headers.get("content-type")||"application/json",l="application/json"===r?await a.json():a.text();O(t,a.status,{contentType:s,data:l})}catch(o){const{stack:r,code:n,message:a}=o,s=(null==r?void 0:r.split("\n")[0])||`Error: ${n}: ${a}`;T(e,t,500,s,r)}}))})(e,t,r)):((e,t)=>{const{origin:o}=e.headers;u(t);let r=null;o?p.includes(o)||(r={code:403,message:`Origin [${o}] is not allowed to access proxy server`}):r={code:400,message:"Proxy server is unable to determine request origin"},r?T(e,t,r.code,r.message):O(t,200)})(e,t)})).listen(8910,d,(()=>{console.log(`${y.default.green(`  ➜ ${c}`)}\n`)})).on("error",(e=>{h(e)}))}catch(e){h(e)}process.on("SIGINT",(()=>{m(),process.exit(0)})),process.on("SIGTERM",(()=>{m(),process.exit(0)}))}
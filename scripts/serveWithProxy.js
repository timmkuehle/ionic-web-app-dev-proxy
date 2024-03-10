import{createRequire as e}from"module";import*as o from"@capacitor/core";import*as r from"colors";var t={d:(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o)};const n=e(import.meta.url)("child_process"),s=(d={Capacitor:()=>o.Capacitor},u={},t.d(u,d),u),a="undefined"!=typeof process?null===process||void 0===process?void 0:process.env:void 0,i=(!s.Capacitor.isNativePlatform()&&(void 0===a.MODE||a.MODE),"undefined"!=typeof process&&process.argv.includes("--webpack-watch")),c=/Development server running!/,l=/Local: |\n/g,p=/hmr update/;var d,u;const v=(e=>{var o={};return t.d(o,e),o})({default:()=>r.default}),m=(v.default.grey((new Date).toLocaleTimeString(Intl.DateTimeFormat().resolvedOptions().locale)),v.default.cyan.bold(" [webAppDevProxy] "),e=>{console.log(v.default.red("  ➜ Error: Unable to serve Ionic App")+v.default.cyan(`\n\nNote: The ${v.default.yellow("serveWithProxy")} script is supposed to run in an Ionic project directory.\nPlease make sure that the Ionic CLI is installed on your system and that \nthis script is executed in the root directory of your Ionic project.\nIf you intend to run the proxy server only, use the ${v.default.yellow("startProxyServer")} script.\nFor more information, read the original error message below.\n\n`)+v.default.red(e.message))}),f=(e,o)=>{o&&m(o),console.log("Shutting down Ionic app development server ...\n"),e.killed||e.kill("SIGTERM")};(()=>{if("undefined"==typeof process)throw new Error("Error: Incompatible environment: This script is supposed to run in a nodeJS environment")})(),console.log((i?"\n":"")+"Starting Ionic app development server ...\n");const g=(0,n.spawn)("ionic",["serve","--no-open"]);g.on("error",(e=>{m(e)})),g.stderr.on("data",(e=>{m({message:e.toString()})})),g.stdout.on("data",(e=>{const o=e.toString();if(c.test(e)){const e=((e,o)=>{const r=e.match(/Local: .*\n/);if(!r||!r.length)return f(o,{message:"Error: Unable to retrieve local Ionic app development server URL"}),null;const t=r[0].replace(l,"");return/^(https?:\/\/(www\.)?([\w0-9-]+\.?)+([a-z]{2,63})?|([0-9]{1,3}\.){3}[0-9]{1,3}):[0-9]{1,5}$/.test(t)?t:(f(o,{message:`Error: [${t}] is not a valid Ionic app development server address`}),null)})(o,g);if(!e)return;s=e,console.log(v.default.green(`  ➜ ${s}\n`));const a=(0,n.fork)("scripts/startProxyServer.js",[e]);return t=g,void(r=a).on("exit",(()=>{0!==r.exitCode&&(f(t),process.exit(1))}))}var r,t,s;(e=>{p.test(e)&&console.log(e.replace(/^\[(vite|webpack)\] |\n/g,""))})(o)})),process.on("SIGTERM",(()=>{f(g),process.exit(0)})),process.on("SIGINT",(()=>{f(g),process.exit(0)}));
#!/usr/bin/env node

import { Server } from "http";
import { logExecError } from "./modules/logFunctions";
import { shutdownProxyServer, startProxyServer } from "./modules/proxyServer";

if (process.argv.length <= 2) {
	logExecError({
		code: "EMISSARG",
		message:
			"Missing argument: ionic-web-app-dev-proxy needs to be provided with a command to execute"
	});

	process.exit(1);
}

let proxyServer: Server | null;
switch (process.argv[2]) {
	case "startProxyServer":
		proxyServer = startProxyServer("http://localhost:8100");
		break;
	default: {
		logExecError({
			code: "EINVARG",
			message: `Invalid argument: [${process.argv[2]}] is not a valid command`
		});

		process.exit(1);
	}
}

process.on("SIGINT", () => {
	process.stdout.write("\n");

	shutdownProxyServer(proxyServer);
});

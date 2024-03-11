#!/usr/bin/env node

import colors from "colors";

if (process.argv.length <= 2) {
	console.log(
		colors.red(
			"Missing argument: No command provided: Valid commands are [serveWithProxy] and [startProxyServer]"
		)
	);

	process.exit(1);
}

console.log("Hello from exec.js", process.argv);

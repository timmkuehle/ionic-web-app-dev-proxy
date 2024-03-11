#!/usr/bin/env node

import { SCRIPTS } from "../constants";
import { logExecError } from "./modules/logFunctions";
import { __dirname } from "../constants";
import path from "path";
import { fork } from "child_process";

if (process.argv.length <= 2) {
	logExecError({
		code: "EMISSARG",
		message:
			"Missing argument: ionic-web-app-dev-proxy needs to be provided with a command to execute"
	});

	process.exit(1);
}

const execScript = process.argv[2];

if (!SCRIPTS.includes(execScript)) {
	logExecError({
		code: "EINVARG",
		message: `Invalid argument: [${execScript}] is not a valid command`
	});

	process.exit(1);
}

fork(path.resolve(__dirname, `scripts/${execScript}.js`));

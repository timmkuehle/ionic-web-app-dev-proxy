import { exec } from "child_process";
import { logIonicServeError, logIonicServeStart } from "./modules/logFunctions";

logIonicServeStart();

exec("ionic serve", (err, stdout, stderr) => {
	if (err) {
		logIonicServeError(err);
	}

	console.log("Guckste da:", stdout);
});

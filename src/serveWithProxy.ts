import { exec } from "child_process";
import { logIonicServeError } from "./modules/logFunctions";

exec("ionic serve", (err, stdout, stderr) => {
	if (err) {
		logIonicServeError(err);
	}

	console.log("Guckste da:", stdout);
});

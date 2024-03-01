import { exec } from "child_process";

exec("ionic serve", (err, stdout, stderr) => {
	if (err) {
		console.log("Dit war nüscht", err);
	}

	console.log("Guckste da:", stdout);
});

const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = (env, argv) => {
	const { mode } = argv;
	const isProduction = mode === "production";
	const devtool = isProduction ? false : "source-map";

	return {
		mode,
		devtool,
		target: "node",
		externals: [nodeExternals()],
		entry: "./src/server.ts",
		module: {
			rules: [
				{
					test: /\.(j|t)s$/,
					exclude: /node_modules/,
					use: "ts-loader"
				}
			]
		},
		resolve: { extensions: ["", ".js", ".ts"] },
		output: {
			path: path.resolve(__dirname, "scripts"),
			filename: "startServer.js"
		},
		plugins: [new NodemonPlugin({ args: ["development"] })]
	};
};

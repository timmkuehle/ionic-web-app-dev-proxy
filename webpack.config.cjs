const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
	const { mode } = argv;
	const isProduction = mode === "production";
	const devtool = isProduction ? false : "source-map";

	return {
		mode,
		devtool,
		externalsPresets: { node: true },
		externals: [
			nodeExternals({
				importType: "module"
			})
		],
		entry: {
			startProxyServer: "./src/startProxyServer.ts",
			serveWithProxy: "./src/serveWithProxy.ts"
		},
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
			filename: "[name].js"
		},
		plugins: [
			new NodemonPlugin({
				script: "./scripts/serveWithProxy.js",
				watch: path.resolve("./scripts"),
				ignore: ["*.js.map"],
				args: ["--webpack-watch"]
			}),
			new CleanWebpackPlugin({
				protectWebpackAssets: false,
				cleanOnceBeforeBuildPatterns: ["**/*.js.map"],
				verbose: isProduction
			})
		],
		experiments: {
			outputModule: true
		}
	};
};

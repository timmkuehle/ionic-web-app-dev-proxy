const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");
const ShebangPlugin = require("webpack-shebang-plugin");
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
			"scripts/startProxyServer": "./src/startProxyServer.ts",
			"scripts/serveWithProxy": "./src/serveWithProxy.ts",
			exec: "./src/exec.ts"
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
		node: {
			__dirname: false
		},
		output: {
			path: path.resolve(__dirname),
			filename: "[name].js"
		},
		plugins: [
			new NodemonPlugin({
				script: "./scripts/serveWithProxy.js",
				watch: path.resolve("./scripts"),
				ignore: ["*.js.map"],
				args: ["--webpack-watch"]
			}),
			new ShebangPlugin(),
			new CleanWebpackPlugin({
				protectWebpackAssets: false,
				cleanOnceBeforeBuildPatterns: [
					"./*.js.map",
					"scripts/*.js.map"
				],
				verbose: isProduction
			})
		],
		experiments: {
			outputModule: true
		}
	};
};

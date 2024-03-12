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
		entry: "./src/index.ts",
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
			path: path.resolve(__dirname),
			filename: "exec.js"
		},
		plugins: [
			new NodemonPlugin({
				script: "./exec.js",
				watch: path.resolve("./exec.js"),
				ignore: ["*.js.map"],
				args: ["serveWithProxy", "webpackWatch"]
			}),
			new ShebangPlugin(),
			new CleanWebpackPlugin({
				protectWebpackAssets: false,
				cleanOnceBeforeBuildPatterns: ["./*.js.map"],
				verbose: isProduction
			})
		],
		experiments: {
			outputModule: true
		}
	};
};

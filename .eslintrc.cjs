const path = require("path");

module.exports = {
	root: true,
	ignorePatterns: ["node_modules", "scripts"],
	env: {
		browser: true,
		node: true
	},
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	rules: { "@typescript-eslint/no-unused-vars": "warn" },
	overrides: [
		{
			files: ["*.cjs"],
			rules: { "@typescript-eslint/no-var-requires": "off" }
		}
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: path.resolve(__dirname, "tsconfig.json"),
		ecmaVersion: "latest",
		sourceType: "module"
	},
	plugins: ["@typescript-eslint/eslint-plugin"]
};

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "standard"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    semi: [2, "always"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
		"multiline-ternary": ["off"],
  }
};

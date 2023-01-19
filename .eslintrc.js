module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: ["eslint:recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["babel"],
  parser: "@babel/eslint-parser",
  rules: {},
};

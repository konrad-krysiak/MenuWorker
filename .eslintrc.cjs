module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
    mocha: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:mocha/recommended",
    "prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "import/first": 1,
  },
};

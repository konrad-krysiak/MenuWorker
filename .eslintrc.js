module.exports = {
  'env': {
    browser: true,
    es2021: true,
    node: true,
  },
  'extends': ['eslint:recommended', 'google'],
  'overrides': [
  ],
  'parserOptions': {
    ecmaVersion: 'latest',
  },
  'plugins': ['babel'],
  'parser': '@babel/eslint-parser',
  'rules': {
    'new-cap': 0,
    'object-curly-spacing': ['error', 'always'],
    'max-len': 0,
    'require-jsdoc': 0,
  },

};

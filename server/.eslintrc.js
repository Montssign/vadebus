module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
  ],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
		'prettier/prettier': 'error',
		'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': ['error', {argsIgnorePattern: 'next'}],
		'semi': ['error', 'never'],
		'no-plusplus': 'off',
		'import/prefer-default-export': 'off'
	},
	overrides: [
    {
      files: [
        "**/*.test.js",
      ],
      env: {
        jest: true
      }
    }
  ]
};

// eslint.config.js
const js = require('@eslint/js');
const prettier = require('eslint-plugin-prettier/recommended');

module.exports = [
  js.configs.recommended,
  prettier,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly'
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'commonjs'
      }
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-undef': 'error'
    }
  },
  {
    ignores: [
      'node_modules/',
      '.env',
      'docker-compose*',
      'Dockerfile'
    ]
  }
];
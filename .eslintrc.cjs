module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'react', 'import', 'sort-imports-es6-autofix'],
  rules: {
    'no-unused-vars': ['error', { varsIgnorePattern: 'React' }],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'import/export': 'error',
    'import/no-duplicates': 'error',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'unknown', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
  },
};

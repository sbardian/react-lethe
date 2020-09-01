module.exports = {
  extends: [
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'prettier/react',
  ],
  plugins: ['react', 'jsx-a11y', 'prettier'],
  env: {
    jest: true,
  },
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
}

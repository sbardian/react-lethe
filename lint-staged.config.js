module.exports = {
  '*.{js,ts,tsx}': ['prettier --write', 'eslint --fix'],
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
  '*.{html,json,md,yml,yaml}': ['prettier --write'],
}

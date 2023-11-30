function test() {
  return "yarn test";
}

function build() {
  return "yarn build";
}

module.exports = {
  "**/*.{js,ts,json,yml,yaml,md}": "prettier --write",
  "{src,apps,libs,test}/**/*.ts": ["eslint --cache --fix", test, build],
};

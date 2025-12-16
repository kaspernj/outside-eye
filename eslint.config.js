const jsdoc = require("eslint-plugin-jsdoc")
const {defineConfig} = require("eslint/config")
const expoConfig = require("eslint-config-expo/flat")

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  jsdoc.configs["flat/recommended"],
  {
    rules: {
      "jsdoc/reject-any-type": "off",
      "jsdoc/require-param-description": "off",
      "jsdoc/require-property-description": "off",
      "jsdoc/require-returns-description": "off"
    }
  }
])

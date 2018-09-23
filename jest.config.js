module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: 
  {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: [
    "<rootDir>/(tests/**/*.spec.(ts|tsx|js)|**/__tests__/*.(ts|tsx|js))"
  ],
  setupTestFrameworkScriptFile: "<rootDir>/tests/runner.js"
};

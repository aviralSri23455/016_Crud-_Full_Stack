module.exports = {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    transformIgnorePatterns: [
      "/node_modules/(?!axios).+\\.js$"
    ],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "<rootDir>/src/mockStyles.js"
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
  };
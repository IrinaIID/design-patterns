module.exports = {
  testMatch: [
    "**/__tests__/**/*.spec.ts",
    "**/?(*.)+(spec).ts"
  ],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  }
};
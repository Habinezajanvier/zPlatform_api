module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  verbose: true,
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist"
  ],
  testTimeout: 30000
};

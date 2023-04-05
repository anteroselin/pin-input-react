module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "\\.(scss|css|less)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fs.js",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/*.test.(ts|tsx)"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};

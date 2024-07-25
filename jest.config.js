// jest.config.js
module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    moduleFileExtensions: ['js'],
    testMatch: ['**/*.test.js'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.js'],
  };
  
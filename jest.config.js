/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // We'll have separate configs for unit and integration tests later,
  // for now this will find all tests.
  testMatch: ['**/src/**/*.test.ts', '**/integration/**/*.test.ts'],
  reporters: [
    'default',
    '<rootDir>/tools/typedoc-test-status/jest-reporter.ts'
  ],
};

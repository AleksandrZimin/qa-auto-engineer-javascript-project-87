import { defaults } from 'jest-config';

export default {
  moduleDirectories: [...defaults.moduleDirectories, 'bower_components'],
  testEnvironment: 'node',
  transform: {},
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text"]
};
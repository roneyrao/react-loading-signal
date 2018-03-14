module.exports = {
  bail: true,
  verbose: true,

  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },

  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupTestFrameworkScriptFile: '<rootDir>/jest.setupFramework.js',
};

module.exports = {
  bail: true,
  verbose: true,

  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.js', 'demo/**/*.js'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },

  roots: ['<rootDir>/src', '<rootDir>/demo'],
  moduleFileExtensions: ['js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupTestFrameworkScriptFile: '<rootDir>/jest.setupFramework.js',
};

module.exports = {
  roots: ['<rootDir>'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/test/jest/__mocks__/styleMock.ts',
    'domain/(.*)': '<rootDir>/src/domain/$1',
    'services/(.*)': '<rootDir>/src/services/$1',
    'infra/(.*)': '<rootDir>/src/infra/$1',
  },
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
};

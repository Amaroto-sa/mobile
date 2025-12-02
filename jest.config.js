/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/__tests__'],
  moduleNameMapper: {
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '@react-native-async-storage/async-storage':
      '<rootDir>/__mocks__/async-storage.ts',
    '@react-native-cookies/cookies': '<rootDir>/__mocks__/@react-native-cookies/cookies.ts',
    'react-native-encrypted-storage': '<rootDir>/__mocks__/react-native-encrypted-storage.ts',
    'react-native-keychain': '<rootDir>/__mocks__/react-native-keychain.ts'
  },
  setupFiles: ['jest-fetch-mock'],
  setupFilesAfterEnv: ['jest-fetch-mock'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {isolatedModules: true}]
  }
};

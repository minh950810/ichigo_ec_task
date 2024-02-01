module.exports = {
    preset: 'ts-jest',
    rootDir: './dist',
    testEnvironment: 'node',
    moduleNameMapper: {
        '@exmpl/(.*)': '<rootDir>/src/$1'
    },
    testTimeout: 30000
}

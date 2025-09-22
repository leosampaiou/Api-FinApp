/** @type {import('jest').Config} */
export default {
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',

    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },

    transformIgnorePatterns: ['/node_modules/(?!(\\@faker-js/faker)/)'],
}

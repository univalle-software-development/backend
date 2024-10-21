module.exports = {
	collectCoverage: true, // Enable coverage collection, preserve the testing result for postprocessing
	coverageDirectory: 'coverage', // Directory to output coverage reports, It is  locate in prooject root
	coverageReporters: ['text', 'lcov', 'json'], // Report formats to use, compatibles with Sonar software.
	collectCoverageFrom: [
		'src/**/*.{js,jsx,ts,tsx}', // Files to include for coverage
		'!src/**/*.test.{js,jsx,ts,tsx}', // Exclude test files
		'!src/db.js',
		'!src/index.js', // Exclude specific files if needed
		'!src/**/exclude-folder/**' // Exclude a specific folder
	],
	coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/build'], // Patterns to ignore for coverage
	testEnvironment: 'node', // Set the environment to Node
	// Add any other configurations you need
};

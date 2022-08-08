export default {
	setupFiles: ["./jest.setup.js"],
	testEnvironment: "jest-environment-jsdom",
	transformIgnorePatterns: [],

	moduleNameMapper: {
		"\\.(css|less)$": "<rootDir>/tests/mocks/styleMock.js",
	},
};

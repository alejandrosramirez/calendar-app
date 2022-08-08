export const initialState = {
	status: "checking", // checking, authenticated, not-authenticated
	user: {},
	errorMessage: undefined,
};

export const authenticatedState = {
	status: "authenticated", // checking, authenticated, not-authenticated
	user: {
		uid: "ABC123",
		name: "Alex",
	},
	errorMessage: undefined,
};

export const notAuthenticatedState = {
	status: "not-authenticated", // checking, authenticated, not-authenticated
	user: {},
	errorMessage: undefined,
};



import {
	authSlice,
	onChecking,
	onClearErrorMessage,
	onLogin,
	onLogout,
} from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../fixtures/authStates";
import { testUser } from "../../fixtures/testUser";

describe("Pruebas en authSlice", () => {
	test("Debe de regresar el estado por defecto", () => {
		expect(authSlice.getInitialState()).toEqual(initialState);
	});

	test("Debe de realizar un login", () => {
		const state = authSlice.reducer(initialState, onLogin(testUser));
		expect(state).toEqual({
			status: "authenticated",
			user: testUser,
			errorMessage: undefined,
		});
	});

	test("Debe de realizar el logout", () => {
		const state = authSlice.reducer(authenticatedState, onLogout());
		expect(state).toEqual({
			status: "not-authenticated",
			user: {},
			errorMessage: undefined,
		});
	});

	test("Debe de realizar el logout con mensaje de error", () => {
		const errorMessage = "Credenciales invalidas";
		const state = authSlice.reducer(
			authenticatedState,
			onLogout(errorMessage)
		);
		expect(state).toEqual({
			status: "not-authenticated",
			user: {},
			errorMessage,
		});
	});

	test("Debe de limpiar el mensaje de error", () => {
		const errorMessage = "Credenciales invalidas";
		const state = authSlice.reducer(
			authenticatedState,
			onLogout(errorMessage)
		);
		const newState = authSlice.reducer(state, onClearErrorMessage());
		expect(newState.errorMessage).toBe(undefined);
	});

	test("Debe de verificar el usuario", () => {
		const state = authSlice.reducer(authenticatedState, onChecking());
		expect(state).toEqual(initialState);
	});
});

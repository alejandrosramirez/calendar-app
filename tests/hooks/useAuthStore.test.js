import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { calendarApi } from "../../src/api";

import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { testUser } from "../fixtures/testUser";

const getMockStore = (initialState) => {
	return configureStore({
		reducer: {
			auth: authSlice.reducer,
		},
		preloadedState: {
			auth: { ...initialState },
		},
	});
};

describe("Pruebas en useAuthStore", () => {
	beforeEach(() => localStorage.clear());

	test("Debe de regresar los valores por defecto", () => {
		const mockStore = getMockStore({ ...initialState });
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});
		expect(result.current).toEqual({
			status: "checking",
			user: {},
			errorMessage: undefined,
			startCheckAuthToken: expect.any(Function),
			startLogin: expect.any(Function),
			startLogout: expect.any(Function),
			startRegister: expect.any(Function),
		});
	});

	test("Debe de realizar el login correctamente", async () => {
		const mockStore = getMockStore({ ...notAuthenticatedState });
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});
		await act(async () => {
			await result.current.startLogin(testUser);
		});
		const { status, user, errorMessage } = result.current;
		expect({ status, user, errorMessage }).toEqual({
			status: "authenticated",
			user: {
				uid: testUser.uid,
				name: testUser.name,
			},
			errorMessage: undefined,
		});
		expect(localStorage.getItem("token")).toEqual(expect.any(String));
		expect(localStorage.getItem("token-init-date")).toEqual(
			expect.any(String)
		);
	});

	test("Debe de fallar la autenticación", async () => {
		const mockStore = getMockStore({ ...notAuthenticatedState });
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});
		await act(async () => {
			await result.current.startLogin({
				email: "alguien@mail.com",
				password: "1234567890'",
			});
		});
		const { status, user, errorMessage } = result.current;
		expect(localStorage.getItem("token")).toBe(null);
		expect({ status, user, errorMessage }).toEqual({
			status: "not-authenticated",
			user: {},
			errorMessage: expect.any(String),
		});
		// waitFor(() => expect(result.current.errorMessage).toBe(undefined));
	});

	test("Debe de crear un usuario", async () => {
		const newUser = {
			name: "Test user 2",
			email: "alguien@mail.com",
			password: "1234567890'",
		};
		const mockStore = getMockStore({ ...notAuthenticatedState });
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});
		const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
			data: {
				ok: true,
				uid: "ABC123",
				name: "Test user 2",
				token: "__123__ABC",
			},
		});
		await act(async () => {
			await result.current.startRegister(newUser);
		});
		const { status, user, errorMessage } = result.current;
		expect({ status, user, errorMessage }).toEqual({
			status: "authenticated",
			user: {
				uid: "ABC123",
				name: "Test user 2",
			},
			errorMessage: undefined,
		});
		spy.mockRestore();
	});

	test("Debe de fallar la creación", async () => {
		const mockStore = getMockStore({ ...notAuthenticatedState });
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});
		await act(async () => {
			await result.current.startRegister(testUser);
		});
		const { status, user, errorMessage } = result.current;
		expect({ status, user, errorMessage }).toEqual({
			status: "not-authenticated",
			user: {},
			errorMessage: expect.any(String),
		});
		// waitFor(() => expect(result.current.errorMessage).toBe(undefined));
	});

	test("Debe de fallar si no hay token", async () => {
		const mockStore = getMockStore({ ...initialState });
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});
		await act(async () => {
			await result.current.startCheckAuthToken();
		});
		const { status, user, errorMessage } = result.current;
		expect({ status, user, errorMessage }).toEqual({
			status: "not-authenticated",
			user: {},
			errorMessage: undefined,
		});
	});

	test("Debe de autenticar al usuario si hay token", async () => {
		const { data } = await calendarApi.post("/auth/login", testUser);
		localStorage.setItem("token", data.token);
		console.log(data);
		const mockStore = getMockStore({ ...initialState });
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});
		await act(async () => {
			await result.current.startCheckAuthToken();
		});
		const { status, user, errorMessage } = result.current;
		expect({ status, user, errorMessage }).toEqual({
			status: "authenticated",
			user: {
				uid: testUser.uid,
				name: testUser.name,
			},
			errorMessage: undefined,
		});
	});
});

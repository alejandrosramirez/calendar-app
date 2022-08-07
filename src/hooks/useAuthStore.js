import { useDispatch, useSelector } from "react-redux";

import { calendarApi } from "../api";
import { onChecking, onClearErrorMessage, onLogin, onLogout } from "../store";

export const useAuthStore = () => {
	const dispatch = useDispatch();

	const { status, user, errorMessage } = useSelector((state) => state.auth);

	const startLogin = async ({ email, password }) => {
		try {
			dispatch(onChecking());

			const { data } = await calendarApi.post("/auth/login", {
				email,
				password,
			});

			localStorage.setItem("token", data.token);
			localStorage.setItem("token-init-date", new Date().getTime());

			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			dispatch(onLogout("Credenciales incorrectas"));

			setTimeout(() => {
				dispatch(onClearErrorMessage());
			}, 10);
		}
	};

	const startRegister = async ({ name, email, password }) => {
		try {
			dispatch(onChecking());

			const { data } = await calendarApi.post("/auth/register", {
				name,
				email,
				password,
			});

			localStorage.setItem("token", data.token);
			localStorage.setItem("token-init-date", new Date().getTime());

			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			dispatch(onLogout(error.response.data?.message || "----"));

			setTimeout(() => {
				dispatch(onClearErrorMessage());
			}, 10);
		}
	};

	const startCheckAuthToken = async () => {
		try {
			const token = localStorage.getItem("token");

			if (!token) {
				return dispatch(onLogout());
			}

			const { data } = await calendarApi.get("/auth/refresh");

			localStorage.setItem("token", data.token);
			localStorage.setItem("token-init-date", new Date().getTime());

			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			dispatch(onLogout());

			localStorage.clear();
		}
	};

	const startLogout = () => {
		dispatch(onLogout());
		localStorage.clear();
	};

	return {
		status,
		user,
		errorMessage,

		startCheckAuthToken,
		startLogin,
		startLogout,
		startRegister,
	};
};

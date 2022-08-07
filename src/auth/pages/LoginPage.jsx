import { useEffect } from "react";
import Swal from "sweetalert2";

import { useAuthStore, useForm } from "../../hooks";

import "./LoginPage.css";

const loginFields = {
	loginEmail: "",
	loginPassword: "",
};

const registerFields = {
	registerName: "",
	registerEmail: "",
	registerPassword: "",
	registerPassword2: "",
};

export const LoginPage = () => {
	const { startLogin, startRegister, errorMessage } = useAuthStore();

	const {
		loginEmail,
		loginPassword,
		onChange: onChangeLogin,
	} = useForm(loginFields);

	const {
		registerName,
		registerEmail,
		registerPassword,
		registerPassword2,
		onChange: onChangeRegister,
	} = useForm(registerFields);

	useEffect(() => {
		if (errorMessage !== undefined) {
			Swal.fire("Error", errorMessage, "error");
		}
	}, [errorMessage]);

	const onSubmitLogin = (event) => {
		event.preventDefault();

		startLogin({ email: loginEmail, password: loginPassword });
	};

	const onSubmitRegister = (event) => {
		event.preventDefault();

		if (registerPassword !== registerPassword2) {
			Swal.fire(
				"Error al registrar",
				"Las contraseñas no coinciden",
				"error"
			);
			return;
		}

		startRegister({
			name: registerName,
			email: registerEmail,
			password: registerPassword,
		});
	};

	return (
		<>
			<div className="container login-container">
				<div className="row">
					<div className="col-md-6 login-form-1">
						<h3>Ingreso</h3>
						<form onSubmit={onSubmitLogin}>
							<div className="form-group mb-2">
								<input
									type="email"
									className="form-control"
									placeholder="Correo"
									name="loginEmail"
									value={loginEmail}
									onChange={onChangeLogin}
								/>
							</div>
							<div className="form-group mb-2">
								<input
									type="password"
									className="form-control"
									placeholder="Contraseña"
									name="loginPassword"
									value={loginPassword}
									onChange={onChangeLogin}
								/>
							</div>
							<div className="d-grid gap-2">
								<input
									type="submit"
									className="btnSubmit"
									value="Login"
								/>
							</div>
						</form>
					</div>

					<div className="col-md-6 login-form-2">
						<h3>Registro</h3>
						<form onSubmit={onSubmitRegister}>
							<div className="form-group mb-2">
								<input
									type="text"
									className="form-control"
									placeholder="Nombre"
									name="registerName"
									value={registerName}
									onChange={onChangeRegister}
								/>
							</div>
							<div className="form-group mb-2">
								<input
									type="email"
									className="form-control"
									placeholder="Correo"
									name="registerEmail"
									value={registerEmail}
									onChange={onChangeRegister}
								/>
							</div>
							<div className="form-group mb-2">
								<input
									type="password"
									className="form-control"
									placeholder="Contraseña"
									name="registerPassword"
									value={registerPassword}
									onChange={onChangeRegister}
								/>
							</div>

							<div className="form-group mb-2">
								<input
									type="password"
									className="form-control"
									placeholder="Repita la contraseña"
									name="registerPassword2"
									value={registerPassword2}
									onChange={onChangeRegister}
								/>
							</div>

							<div className="d-grid gap-2">
								<input
									type="submit"
									className="btnSubmit"
									value="Crear cuenta"
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

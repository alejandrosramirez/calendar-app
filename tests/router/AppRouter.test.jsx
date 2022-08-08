import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";
import { CalendarPage } from "../../src/calendar";

jest.mock("../../src/hooks/useAuthStore");

jest.mock("../../src/calendar", () => ({
	CalendarPage: () => <h1>CalendarPage</h1>,
}));

describe("Pruebas en <AppRouter />", () => {
	const mockStartCheckAuthToken = jest.fn();

	beforeEach(() => jest.clearAllMocks());

	test("Debe de mostrar la pantalla de carga y llamar 'startCheckAuthToken'", () => {
		useAuthStore.mockReturnValue({
			status: "checking",
			startCheckAuthToken: mockStartCheckAuthToken,
		});
		render(<AppRouter />);
		expect(screen.getByText("Cargando...")).toBeTruthy();
		expect(mockStartCheckAuthToken).toHaveBeenCalled();
	});

	test("Debe de mostrar el login en caso de no estar autenticado", () => {
		useAuthStore.mockReturnValue({
			status: "not-authenticated",
			startCheckAuthToken: mockStartCheckAuthToken,
		});
		const { container } = render(
			<MemoryRouter initialEntries={["/auth2"]}>
				<AppRouter />
			</MemoryRouter>
		);
		expect(screen.getByText("Ingreso")).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	test("Debe de mostrar el calendario si estamos autenticados", () => {
		useAuthStore.mockReturnValue({
			status: "authenticated",
			startCheckAuthToken: mockStartCheckAuthToken,
		});
		render(
			<MemoryRouter>
				<AppRouter />
			</MemoryRouter>
		);
		expect(screen.getByText("CalendarPage")).toBeTruthy();
	});
});

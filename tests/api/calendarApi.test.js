import calendarApi from "../../src/api/calendarApi";

describe("Pruebas en calendarApi", () => {
	test("Debe de tener la configuración por defecto", () => {
		expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
	});

	test("Debe de tener el encabezado 'x-token' de todas las peticiones", async () => {
		const token = "ABC-123-XEW-TELEVISION";
		localStorage.setItem("token", token);
		const response = await calendarApi.get("/auth");
		expect(response.config.headers["x-token"]).toBe(token);
	});
});

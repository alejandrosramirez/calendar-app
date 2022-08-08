import { onIsDateModalClose, onIsDateModalOpen, uiSlice } from "../../../src/store/ui/uiSlice";

describe("Pruebas en uiSlice", () => {
	test("Debe de regresar el estado por defecto", () => {
		expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
	});

	test("Debe de cambiar el isDateModalOpen correctamente", () => {
		let state = uiSlice.getInitialState();
		state = uiSlice.reducer(state, onIsDateModalOpen());
		expect(state.isDateModalOpen).toBeTruthy();
		state = uiSlice.reducer(state, onIsDateModalClose());
		expect(state.isDateModalOpen).toBeFalsy();
	});
});

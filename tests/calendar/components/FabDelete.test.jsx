import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { store } from "../../../src/store";

describe("Pruebas en <FabDelete />", () => {
	test("Debe de mostrar el componente correctamente", () => {
		// TODO: Terminar una vez termine las pruebas es useCalendarStore
		render(
			<Provider store={store}>
				<FabDelete />
			</Provider>
		);
		screen.debug();
	});
});

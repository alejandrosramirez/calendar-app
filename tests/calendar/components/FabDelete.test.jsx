import { fireEvent, render, screen } from "@testing-library/react";

import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore, useUiStore } from "../../../src/hooks";

jest.mock("../../../src/hooks/useCalendarStore");
jest.mock("../../../src/hooks/useUiStore");

describe("Pruebas en <FabDelete />", () => {
	useUiStore.mockReturnValue({
		isDateModalOpen: false,
	});

	const mockStartDeletingEvent = jest.fn();

	beforeEach(() => jest.clearAllMocks());

	test("Debe de mostrar el componente correctamente", () => {
		useCalendarStore.mockReturnValue({
			hasActiveEvent: false,
		});
		render(<FabDelete />);
		const button = screen.getByLabelText("btn-delete");
		expect(button.classList).toContain("btn");
		expect(button.classList).toContain("btn-danger");
		expect(button.classList).toContain("fab-danger");
		expect(button.style.display).toBe("none");
	});

	test("Debe de mostrar el botón si hay un evento activo", () => {
		useCalendarStore.mockReturnValue({
			hasActiveEvent: true,
		});
		render(<FabDelete />);
		const button = screen.getByLabelText("btn-delete");
		expect(button.style.display).toBe("");
	});

	test("Debe de llamar startDeletingEvent si hay evento activo", () => {
		useCalendarStore.mockReturnValue({
			hasActiveEvent: true,
			startDeletingEvent: mockStartDeletingEvent,
		});
		render(<FabDelete />);
		const button = screen.getByLabelText("btn-delete");
		fireEvent.click(button);
		expect(mockStartDeletingEvent).toHaveBeenCalled();
	});
});

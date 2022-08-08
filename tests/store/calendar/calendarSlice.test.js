import {
	calendarSlice,
	onClearEvents,
	onCreateEvent,
	onDeleteEvent,
	onLoadEvents,
	onSetActiveEvent,
	onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";
import {
	calendarWithActiveEventState,
	calendarWithEventsState,
	events,
	initialState,
} from "../../fixtures/calendarStates";

describe("Pruebas en calendarSlice", () => {
	test("Debe de regresar el estado por defecto", () => {
		const state = calendarSlice.getInitialState();
		expect(state).toEqual(initialState);
	});

	test("Debe de activar el evento", () => {
		const state = calendarSlice.reducer(
			calendarWithEventsState,
			onSetActiveEvent(events[0])
		);
		expect(state.activeEvent).toEqual(events[0]);
	});

	test("Debe de agregar un evento", () => {
		const event = {
			id: "3",
			title: "A donde vamos",
			notes: "A parar",
			start: new Date("2022-08-10 14:00:00"),
			end: new Date("2022-08-10 18:00:00"),
		};
		const state = calendarSlice.reducer(
			calendarWithEventsState,
			onCreateEvent(event)
		);
		expect(state.events).toEqual([...events, event]);
	});

	test("Debe de actualizar un evento", () => {
		const event = {
			id: "1",
			title: "¿Qué?",
			notes: "¿Qué fue eso?",
			start: new Date("2022-08-11 14:00:00"),
			end: new Date("2022-08-11 18:00:00"),
		};
		const state = calendarSlice.reducer(
			calendarWithEventsState,
			onUpdateEvent(event)
		);
		expect(state.events).toContain(event);
	});

	test("Debe de eliminar el evento activo", () => {
		const state = calendarSlice.reducer(
			calendarWithActiveEventState,
			onDeleteEvent()
		);
		expect(state.activeEvent).toBe(null);
		expect(state.events).not.toContain(events[0]);
	});

	test("Debe de establecer los eventos", () => {
		const state = calendarSlice.reducer(initialState, onLoadEvents(events));
		expect(state.isLoadingEvents).toBeFalsy();
		expect(state.events).toEqual(events);
		const newState = calendarSlice.reducer(state, onLoadEvents(events));
		expect(state.events.length).toBe(events.length);
	});

	test("Debe de limpiar el estado", () => {
		const state = calendarSlice.reducer(
			calendarWithActiveEventState,
			onClearEvents()
		);
		expect(state).toEqual(initialState);
	});
});

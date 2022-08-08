import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { calendarApi } from "../api";
import { parseEventDates } from "../helpers";

import {
	onCreateEvent,
	onDeleteEvent,
	onLoadEvents,
	onSetActiveEvent,
	onUpdateEvent,
} from "../store";

export const useCalendarStore = () => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { events, activeEvent } = useSelector((state) => state.calendar);

	const setActiveEvent = (event) => {
		dispatch(onSetActiveEvent(event));
	};

	const startSavingEvent = async (event) => {
		try {
			if (event.id) {
				await calendarApi.put(`/events/${event.id}`, event);

				dispatch(onUpdateEvent({ ...event, user }));

				return;
			}

			const { data } = await calendarApi.post("/events", event);

			dispatch(onCreateEvent({ ...event, id: data.event?.id, user }));
		} catch (error) {
			console.log(`Ocurrió este error: ${error}`);

			Swal.fire(
				"Error al guardar el evento",
				error.response.data?.message,
				"error"
			);
		}
	};

	const startDeletingEvent = async () => {
		try {
			await calendarApi.delete(`/events/${activeEvent.id}`);

			dispatch(onDeleteEvent());
		} catch (error) {
			console.log(`Ocurrió este error: ${error}`);

			Swal.fire(
				"Error al eliminar el evento",
				error.response.data?.message,
				"error"
			);
		}
	};

	const startLoadingEvents = async () => {
		try {
			const { data } = await calendarApi.get("/events");

			const events = parseEventDates(data.events);

			dispatch(onLoadEvents(events));
		} catch (error) {
			console.log(`Ocurrió este error: ${error}`);

			Swal.fire(
				"Error",
				"No se cargaron los eventos correctamente",
				"error"
			);
		}
	};

	return {
		events,
		activeEvent,
		hasActiveEvent: !!activeEvent?.id,

		setActiveEvent,
		startSavingEvent,
		startDeletingEvent,
		startLoadingEvents,
	};
};

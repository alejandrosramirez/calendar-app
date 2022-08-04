import { useDispatch, useSelector } from "react-redux";

import { onCreateEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
	const dispatch = useDispatch();

	const { events, activeEvent } = useSelector((state) => state.calendar);

	const setActiveEvent = (event) => {
		dispatch(onSetActiveEvent(event));
	};

	const startSavingEvent = async (event) => {
		// TODO: Make api request

		if (event._id) {
			dispatch(onUpdateEvent({ ...event }));
		} else {
			dispatch(onCreateEvent({ ...event, _id: new Date().getTime() }));
		}
	};

	const startDeletingEvent = () => {
		// TODO: Make api request
		dispatch(onDeleteEvent());
	};

	return {
		events,
		activeEvent,
		hasActiveEvent: !!activeEvent?._id,

		setActiveEvent,
		startSavingEvent,
		startDeletingEvent,
	};
};

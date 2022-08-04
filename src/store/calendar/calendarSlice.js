import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const auxEvent = {
	_id: new Date().getTime(),
	title: "Cumple de Alex",
	notes: "A comprar pastel",
	start: new Date(),
	end: addHours(new Date(), 2),
	bgColor: "#fafafa",
	user: {
		_id: "1234567890",
		name: "Alex",
	},
};

export const calendarSlice = createSlice({
	name: "calendar",
	initialState: {
		events: [auxEvent],
		activeEvent: null,
	},
	reducers: {
		onSetActiveEvent: (state, { payload }) => {
			state.activeEvent = payload;
		},
		onCreateEvent: (state, { payload }) => {
			state.events.push(payload);
			state.activeEvent = null;
		},
		onUpdateEvent: (state, { payload }) => {
			state.events = state.events.map((event) => {
				if (event._id === payload._id) {
					return payload;
				}

				return event;
			});
			state.activeEvent = false;
		},
		onDeleteEvent: (state) => {
			if (state.activeEvent) {
				state.events = state.events.filter(
					(event) => event._id !== state.activeEvent._id
				);
				state.activeEvent = null;
			}
		},
	},
});

export const {
	onCreateEvent,
	onDeleteEvent,
	onSetActiveEvent,
	onUpdateEvent,
} = calendarSlice.actions;

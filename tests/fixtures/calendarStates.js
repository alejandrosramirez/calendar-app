export const events = [
	{
		id: "1",
		title: "Ejemplo de mensaje",
		notes: "Lo que sea",
		start: new Date("2022-08-08 14:00:00"),
		end: new Date("2022-08-08 18:00:00"),
	},
	{
		id: "2",
		title: "Otro recordatorio",
		notes: "Ayer se vío esto",
		start: new Date("2022-08-09 14:00:00"),
		end: new Date("2022-08-09 18:00:00"),
	},
];

export const initialState = {
	isLoadingEvents: true,
	events: [],
	activeEvent: null,
};

export const calendarWithEventsState = {
	isLoadingEvents: false,
	events: [...events],
	activeEvent: null,
};

export const calendarWithActiveEventState = {
	isLoadingEvents: false,
	events: [...events],
	activeEvent: { ...events[0] },
};

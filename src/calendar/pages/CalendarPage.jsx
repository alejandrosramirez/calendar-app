import { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
	CalendarEvent,
	CalendarModal,
	FabAddNew,
	FabDelete,
	NavBar,
} from "../";
import { calendarLocalizer, getCalendarMessagesEs } from "../../helpers";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPage = () => {
	const { user } = useAuthStore();
	const { openDateModal } = useUiStore();
	const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

	const [lastView, setLastView] = useState(
		localStorage.getItem("lastView") || "week"
	);

	useEffect(() => {
		startLoadingEvents();
	}, []);

	const eventStyleGetter = (event, start, end, isSelected) => {
		const isMyOwnEvent =
			user.uid === event?.user?._id || user.uid === event?.user?.uid;

		const style = {
			backgroundColor: isMyOwnEvent ? "#347CF7" : "#478912",
			borderRadius: "0px",
			opacity: 0.8,
			color: "white",
		};

		return { style };
	};

	const onDoubleClick = (event) => {
		openDateModal();
	};

	const onSelect = (event) => {
		setActiveEvent(event);
	};

	const onViewChanged = (event) => {
		localStorage.setItem("lastView", event);
	};

	return (
		<>
			<NavBar />

			<Calendar
				culture="es"
				localizer={calendarLocalizer}
				events={events}
				defaultView={lastView}
				startAccessor="start"
				endAccessor="end"
				style={{ height: "calc(100vh - 80px)" }}
				messages={getCalendarMessagesEs()}
				eventPropGetter={eventStyleGetter}
				components={{
					event: CalendarEvent,
				}}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelect}
				onView={onViewChanged}
			/>

			<CalendarModal />

			<FabAddNew />
			<FabDelete />
		</>
	);
};

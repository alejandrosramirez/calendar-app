import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {
	const { isDateModalOpen } = useUiStore();
	const { hasActiveEvent, startDeletingEvent } = useCalendarStore();

	const onDeleteEvent = () => {
		startDeletingEvent();
	};

	return (
		<button
			style={{
				display: hasActiveEvent && !isDateModalOpen ? "" : "none",
			}}
			className="btn btn-danger fab-danger"
			onClick={onDeleteEvent}
			aria-label="btn-delete"
		>
			<i className="fas fa-trash-alt"></i>
		</button>
	);
};

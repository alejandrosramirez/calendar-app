import { addHours } from "date-fns";

import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
	const { openDateModal } = useUiStore();
	const { setActiveEvent } = useCalendarStore();

	const onNewEvent = () => {
		setActiveEvent({
			title: "",
			notes: "",
			start: new Date(),
			end: addHours(new Date(), 2),
			bgColor: "#fafafa",
			user: {
				_id: "1234567890",
				name: "Alex",
			},
		});
		openDateModal();
	};

	return (
		<button className="btn btn-primary fab" onClick={onNewEvent}>
			<i className="fas fa-plus"></i>
		</button>
	);
};

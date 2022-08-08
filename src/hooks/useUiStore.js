import { useDispatch, useSelector } from "react-redux";

import { onIsDateModalClose, onIsDateModalOpen } from "../store";

export const useUiStore = () => {
	const dispatch = useDispatch();

	const { isDateModalOpen } = useSelector((state) => state.ui);

	const openDateModal = () => {
		dispatch(onIsDateModalOpen());
	};

	const closeDateModal = () => {
		dispatch(onIsDateModalClose());
	};

	const toggleDateModal = () => {
		isDateModalOpen ? closeDateModal() : openDateModal();
	};

	return {
		isDateModalOpen,

		openDateModal,
		closeDateModal,
		toggleDateModal,
	};
};

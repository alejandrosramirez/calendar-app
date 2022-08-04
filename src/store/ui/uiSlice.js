import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
	name: "ui",
	initialState: {
		isDateModalOpen: false,
	},
	reducers: {
		onIsDateModalOpen: (state) => {
			state.isDateModalOpen = true;
		},
		onIsDateModalClose: (state) => {
			state.isDateModalOpen = false;
		},
	},
});

export const { onIsDateModalClose, onIsDateModalOpen } = uiSlice.actions;

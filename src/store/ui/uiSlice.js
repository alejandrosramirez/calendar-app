import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
	name: "ui",
	initialState: {
		isDateModalOpen: false,
	},
	reducers: {
		onIsModalDateOpen: (state) => {
			state.isDateModalOpen = true;
		},
		onIsModalDateClose: (state) => {
			state.isDateModalOpen = false;
		},
	},
});

export const { onIsModalDateClose, onIsModalDateOpen } = uiSlice.actions;

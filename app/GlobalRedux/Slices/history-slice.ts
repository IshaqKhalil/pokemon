"use client";

import { createSlice } from "@reduxjs/toolkit"

export interface HistorySlice {
    value: string[];
}

const initialState: HistorySlice = {
    value: []
}

export const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        saveSearchHistory: (state, action) => {
            state.value = [...state.value, action.payload];
        }
    }
})

export const { saveSearchHistory } = historySlice.actions;

export default historySlice.reducer;
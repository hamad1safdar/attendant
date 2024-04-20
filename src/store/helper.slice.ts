import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { HelperState, AlertState, IsLoading } from '../types';

const initialState: HelperState = {
    isLoading: false,
    alert: {
        show: false,
        message: '',
        type: 'success',
    },
};

const helperSlice = createSlice({
    name: 'helper',
    initialState: initialState,
    reducers: {
        setLoading(state, action: PayloadAction<IsLoading>) {
            state.isLoading = action.payload;
        },
        showAlert(state, action: PayloadAction<Omit<AlertState, 'show'>>) {
            state.alert = { ...action.payload, show: true };
        },
        closeAlert(state) {
            state.alert.show = false;
        },
    },
});

export const { setLoading, showAlert, closeAlert } = helperSlice.actions;
export default helperSlice.reducer;

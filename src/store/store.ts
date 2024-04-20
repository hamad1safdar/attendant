import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user.slice';
import helperReducer from './helper.slice';

export const store = configureStore({
    devTools: true,
    reducer: {
        users: userReducer,
        helper: helperReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

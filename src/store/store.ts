import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth.slice';
import userReducer from './user.slice';
import recordReducer from './records.slice';

export const store = configureStore({
    devTools: true,
    reducer: {
        auth: authReducer,
        users: userReducer,
        records: recordReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

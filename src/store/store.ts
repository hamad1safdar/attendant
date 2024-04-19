import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user.slice';
import recordReducer from './records.slice';

export const store = configureStore({
    devTools: true,
    reducer: {
        users: userReducer,
        records: recordReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

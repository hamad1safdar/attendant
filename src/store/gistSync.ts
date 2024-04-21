import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { punchIn, punchOut, requestLeave, setUsers } from './user.slice';

import { AppDispatch, RootState } from './store';
import { updateUsers } from '../services/gists';

const middleware = createListenerMiddleware();

const startListening = middleware.startListening.withTypes<
    RootState,
    AppDispatch
>();

startListening({
    matcher: isAnyOf(punchIn, punchOut, requestLeave),
    effect: async (_action, { dispatch, getState }) => {
        const { users } = getState().users;
        try {
            const newUsers = await updateUsers(users);
            dispatch(setUsers(newUsers));
        } catch (error) {
            dispatch(setUsers(users));
        }
    },
});

export default middleware;

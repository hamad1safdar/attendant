import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getUsers, updateUsers as updateUsersApi } from '../services/gists';
import type { AttendanceRecord, EmployeeId, User } from '../types';
import { useAppDispatch, useAppSelector } from '../store';
import { setCurrentUser } from '../store/user.slice';

export const USERS_QUERY_KEY = 'gists/users';

const patchUsers = (user: User, users: Array<User>) => {
    const index = users.findIndex((u) => u.emplyeeId === user.emplyeeId);
    if (index < 0) {
        return users;
    } else {
        return [...users.slice(0, index), user, ...users.slice(index + 1)];
    }
};

const useApp = () => {
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector((state) => state.users);

    const { data: users } = useQuery<Array<User>>({
        queryKey: [USERS_QUERY_KEY],
        queryFn: getUsers,
        placeholderData: [],
    });

    const { mutate: updateUsersOnGist, mutateAsync } = useMutation({
        mutationFn: updateUsersApi,

        onSuccess: (data: Array<User>) => {
            queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
            if (currentUser?.role === 'user') {
                const index = data.findIndex(
                    (user) => user.emplyeeId === currentUser.emplyeeId
                );
                dispatch(setCurrentUser({ ...data[index] }));
            }
        },
    });

    const addUser = (user: User) => {
        const updatedUsers = [...users!, user];
        updateUsersOnGist(updatedUsers);
    };

    const deleteUser = (employeeId: EmployeeId) => {
        const updatedUsers = users?.filter(
            (user) => user.emplyeeId !== employeeId
        );
        updateUsersOnGist(updatedUsers!);
    };

    const punchIn = (record: AttendanceRecord) => {
        const updatedCurrentUser = {
            ...currentUser,
            record: [record, ...currentUser!.record],
        };
        const patchedUsers = patchUsers(updatedCurrentUser as User, users!);
        updateUsersOnGist(patchedUsers);
    };

    const punchOut = (punchOutTime: AttendanceRecord['punchOut']) => {
        const updated = {
            ...currentUser,
            record: [
                { ...currentUser?.record[0], punchOut: punchOutTime },
                ...currentUser!.record.slice(1),
            ],
        };

        const patchedUsers = patchUsers(updated as User, users!);
        updateUsersOnGist(patchedUsers);
    };

    const bookLeave = (leaveRecord: AttendanceRecord) => {
        const updatedCurrentUser = {
            ...currentUser,
            record: [leaveRecord, ...currentUser!.record],
        };
        const patchedUsers = patchUsers(updatedCurrentUser as User, users!);
        updateUsersOnGist(patchedUsers);
    };

    return {
        users,
        currentUser,
        addUser,
        deleteUser,
        punchIn,
        punchOut,
        bookLeave,
        updateUsers: mutateAsync,
    };
};

export default useApp;

import axios from 'axios';
import type { Gist, GistFile, User } from '../types';

const GIST_ENDPOINT = 'https://api.github.com/gists';
const ACCESS_TOKEN = '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';

const USER_GIST_ID = 'ed8789dac7cc871da7e3b421902bcd79';
const USER_GIST_NAME = 'users.json';

export const getUsers = async () => {
    const response = await getGistById(USER_GIST_ID);
    return JSON.parse(
        (response.data.files as GistFile)[USER_GIST_NAME].content
    );
};

export const updateUsers = async (newUsers: Array<User>) => {
    const newGist: Gist = {
        files: {
            [USER_GIST_NAME]: {
                content: JSON.stringify(newUsers),
            },
        },
    };
    await updateGistById(USER_GIST_ID, newGist);
};

const getGistById = (gistId: string) => {
    return axios.get(`${GIST_ENDPOINT}/${gistId}`, {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            Accept: 'application/vnd.github+json',
            Authorization: 'Bearer ' + ACCESS_TOKEN,
        },
    });
};

const updateGistById = (gistId: string, gist: Gist) => {
    return axios.patch(`${GIST_ENDPOINT}/${gistId}`, gist, {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            Authorization: 'Bearer ' + ACCESS_TOKEN,
        },
    });
};

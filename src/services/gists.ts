import axios from 'axios';
import type { Gist, GistFile, User } from '../types';

import { GIT_ACCESS_TOKEN } from '../secrets';

const GIST_ENDPOINT = 'https://api.github.com/gists';

const USER_GIST_ID = 'ed8789dac7cc871da7e3b421902bcd79';
const USER_GIST_NAME = 'users.json';
// const RECORDS_GIST_ID = '447fd59bfed3518a058eef08d9dae3a3';
// const RECORDS_GIST_NAME = 'records.json';
// const HELPER_DATA_GIST_ID = 'c099f4a808aab569a5262a4ce6bdb1c4';
// const HELPER_DATA_GIST_NAME = 'helper_data.json';

export const getUsers = async (): Promise<Array<User>> => {
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
    const response = await updateGistById(USER_GIST_ID, newGist);
    return JSON.parse(
        (response.data.files as GistFile)[USER_GIST_NAME].content
    );
};

//GIST Common API

const getGistById = (gistId: string) => {
    return axios.get(`${GIST_ENDPOINT}/${gistId}`, {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            Accept: 'application/vnd.github+json',
            Authorization: 'Bearer ' + GIT_ACCESS_TOKEN,
        },
    });
};

const updateGistById = (gistId: string, gist: Gist) => {
    return axios.patch(`${GIST_ENDPOINT}/${gistId}`, gist, {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            Authorization: 'Bearer ' + GIT_ACCESS_TOKEN,
        },
    });
};

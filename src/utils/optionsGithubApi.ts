import { sessionSaver } from '../utils/SessionSaver';

export type OptionsType = {
    method: string;
    headers: {
        Accept: string;
        authorization?: string;
    };
};

const getOptionsGithubApi = (): OptionsType => {
    const accessToken = sessionSaver.getGithubAccessToken() || '';
    const options: OptionsType = {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    };

    if (accessToken) {
        options.headers['authorization'] = `token ${accessToken}`;
    }

    return options;
};

export default getOptionsGithubApi;

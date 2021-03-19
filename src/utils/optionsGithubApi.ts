export type OptionsType = {
    method: string;
    headers: {
        Accept: string;
        authorization?: string;
    };
};

const getOptionsGithubApi = (token: string): OptionsType => {
    const options: OptionsType = {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    };

    if (token) {
        options.headers['authorization'] = `token ${token}`;
    }

    return options;
};

export default getOptionsGithubApi;

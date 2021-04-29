import { sessionSaver } from '../utils/SessionSaver';

export const authenticate = (proxyUrl: string, code: string): Promise<string | void> => {
    return fetch(proxyUrl, {
        method: 'POST',
        body: JSON.stringify({ code })
    })
        .then(response => {
            return response.json();
        })
        .then(accessToken => {
            sessionSaver.setGithubAccessToken(accessToken);

            return 'isLoggedIn';
        })
        .catch(error => {
            console.log(error);
        });
};

export const getOauthLink = (clientId: string, redirectUri: string): string =>
    `https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}&redirect_uri=${redirectUri}`;

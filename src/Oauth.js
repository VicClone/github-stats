export const getOauthLink = (clientId, redirectUri) =>
    `https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}&redirect_uri=${redirectUri}`;

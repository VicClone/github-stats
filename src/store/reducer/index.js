import { sessionSaver } from "../../SessionSaver";

export const initialState = {
    isLoggedIn: sessionSaver.getIsLogged() || false,
    user: sessionSaver.getUserName(),
    clientId: process.env.REACT_APP_CLIENT_ID,
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    proxyUrl: process.env.REACT_APP_PROXY_URL
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            sessionSaver.setUserName(action.payload.user.name);
            sessionSaver.setIsLogged(action.payload.isLoggedIn);
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                userName: action.payload.user.name
            };
        }
        case "LOGOUT": {
            localStorage.clear();
            return {
                ...state,
                isLoggedIn: false,
                userName: null
            };
        }
        default:
            return state;
    }
};

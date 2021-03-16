import { sessionSaver } from "../../SessionSaver";

export const initialState = {
    isLoggedIn: sessionSaver.getIsLogged() || false,
    user: sessionSaver.getUserName(),
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    proxy_url: process.env.REACT_APP_PROXY_URL
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

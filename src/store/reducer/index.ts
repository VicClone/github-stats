import { sessionSaver } from '../../utils/SessionSaver';
import { LOGIN, LOGOUT } from '../actions';
import { AppState } from '../../types/appTypes';

export const initialState: AppState = {
    isLoggedIn: sessionSaver.getIsLogged() || false,
    user: sessionSaver.getUserName(),
    clientId: process.env.REACT_APP_CLIENT_ID!,
    redirectUri: process.env.REACT_APP_REDIRECT_URI!,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET!,
    proxyUrl: process.env.REACT_APP_PROXY_URL!,
    userName: null
};

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case LOGIN: {
            sessionSaver.setUserName(action.payload.user.name);
            sessionSaver.setIsLogged(action.payload.isLoggedIn);
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                userName: action.payload.user.name
            };
        }
        case LOGOUT: {
            sessionSaver.clear();
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

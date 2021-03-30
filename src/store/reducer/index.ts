import { sessionSaver } from '../../utils/SessionSaver';
import { LOGIN, LOGOUT } from '../actions';
import { AppState } from '../../types/appTypes';

export const initialState: AppState = {
    isLoggedIn: sessionSaver.getIsLogged() || false,
    user: sessionSaver.getUserName(),
    clientId: process.env.REACT_APP_CLIENT_ID!,
    redirectUri: process.env.REACT_APP_REDIRECT_URI!,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET!,
    proxyUrl: process.env.REACT_APP_PROXY_URL!
};

export const reducer = (state: AppState, action: any) => {
    switch (action.type) {
        case LOGIN: {
            sessionSaver.setIsLogged(action.payload.isLoggedIn);
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn
            };
        }
        case LOGOUT: {
            sessionSaver.clear();
            return {
                ...state,
                isLoggedIn: false
            };
        }
        default:
            return state;
    }
};

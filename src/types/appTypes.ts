import { RepoData, UserData } from './apiTypes';

export interface AppState {
    isLoggedIn: boolean;
    user: string | null;
    clientId: string;
    redirectUri: string;
    clientSecret: string;
    proxyUrl: string;
    searchedUser: UserData | null;
}

export interface AuthContextType {
    state: AppState;
    dispatch: React.Dispatch<any>;
}

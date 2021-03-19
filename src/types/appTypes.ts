export interface AppState {
    isLoggedIn: boolean;
    user: string | null;
    clientId: string;
    redirectUri: string;
    clientSecret: string;
    proxyUrl: string;
    userName: string | null;
}

export interface AuthContextType {
    state: AppState;
    dispatch: React.Dispatch<any>;
}

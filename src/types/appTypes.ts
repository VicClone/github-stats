import { RepoData, UserData } from './apiTypes';

export interface AppState {
    isLoggedIn: boolean;
    user: string | null;
    clientId: string;
    redirectUri: string;
    clientSecret: string;
    proxyUrl: string;
}

export interface AuthContextType {
    state: AppState;
    dispatch: React.Dispatch<any>;
}

export interface AverageTimeClosureStatsData {
    [key: string]: AverageTimeClosureStatsAtYear[];
}

export interface AverageTimeClosureStatsAtYear {
    month: string;
    averageTimeInHours: number;
}

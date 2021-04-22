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

export interface AverageClosingTimeStatsAtYear {
    month: string;
    averageTimeInHours: number;
}

export interface AverageClosingTimeData {
    [key: string]: AverageClosingTimeStatsAtYear[];
}

export interface LanguageStats {
    [key: string]: number;
}

export interface LanguagePercents {
    name: string;
    percent: number;
}

export interface CommitedDatesNumbers {
    [key: string]: number;
}

export interface commitedDateState {
    month: string;
    number: number;
}

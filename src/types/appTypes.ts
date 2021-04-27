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

export interface AvergeTimes {
    createdAt: string;
    closedAt: string;
    timeClosing?: number;
}

export interface AvergeTimesGroupByMonth {
    [key: string]: AvergeTimes[];
}

export interface AverageTimeForMonth {
    [key: string]: number;
}

export interface Months {
    [key: string]: string;
}

export interface DateTimeFormatOptions {
    dateStyle?: 'full' | 'long' | 'medium' | 'short';
    timeStyle?: 'full' | 'long' | 'medium' | 'short';
    calendar?:
        | 'buddhist'
        | 'chinese'
        | 'coptic'
        | 'ethiopia'
        | 'ethiopic'
        | 'gregory'
        | 'hebrew'
        | 'indian'
        | 'islamic'
        | 'iso8601'
        | 'japanese'
        | 'persian'
        | 'roc';
    dayPeriod?: 'narrow' | 'short' | 'long';
    numberingSystem?:
        | 'arab'
        | 'arabext'
        | 'bali'
        | 'beng'
        | 'deva'
        | 'fullwide'
        | 'gujr'
        | 'guru'
        | 'hanidec'
        | 'khmr'
        | 'knda'
        | 'laoo'
        | 'latn'
        | 'limb'
        | 'mlym'
        | 'mong'
        | 'mymr'
        | 'orya'
        | 'tamldec'
        | 'telu'
        | 'thai'
        | 'tibt';
    localeMatcher?: 'best fit' | 'lookup';
    timeZone?: string;
    hour12?: boolean;
    hourCycle?: 'h11' | 'h12' | 'h23' | 'h24';
    formatMatcher?: 'best fit' | 'basic';
    weekday?: 'long' | 'short' | 'narrow';
    era?: 'long' | 'short' | 'narrow';
    year?: 'numeric' | '2-digit';
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    day?: 'numeric' | '2-digit';
    hour?: 'numeric' | '2-digit';
    minute?: 'numeric' | '2-digit';
    second?: 'numeric' | '2-digit';
    fractionalSecondDigits?: 0 | 1 | 2 | 3;
    timeZoneName?: 'long' | 'short';
}

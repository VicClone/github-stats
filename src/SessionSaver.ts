class SessionSaver {
    private USER_NAME_KEY = 'userName';
    private IS_LOGGED_IN = 'isLoggedIn';

    setUserName(userName: string): void {
        localStorage.setItem(this.USER_NAME_KEY, userName);
    }

    getUserName(): string | null {
        return localStorage.getItem(this.USER_NAME_KEY);
    }

    setIsLogged(isLoggedIn: boolean): void {
        localStorage.setItem(this.IS_LOGGED_IN, JSON.stringify(isLoggedIn));
    }

    getIsLogged(): boolean {
        return JSON.parse(localStorage.getItem(this.IS_LOGGED_IN) as string);
    }
}

export const sessionSaver = new SessionSaver();

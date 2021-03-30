import { RepoData } from '../types/apiTypes';

class SessionSaver {
    private USER_NAME_KEY = 'userName';
    private IS_LOGGED_IN = 'isLoggedIn';
    private SELECTED_REPO = 'selectedRepo';
    private SEARCHED_USER = 'searchedUser';

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

    setSelectedRepo(repo: RepoData): void {
        localStorage.setItem(this.SELECTED_REPO, JSON.stringify(repo));
    }

    getSelectedRepo(): RepoData {
        return JSON.parse(localStorage.getItem(this.SELECTED_REPO) as string);
    }

    clear(): void {
        localStorage.clear();
    }
}

export const sessionSaver = new SessionSaver();

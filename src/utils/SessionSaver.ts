import { RepoInfo } from '../types/apiTypes';

class SessionSaver {
    private USER_NAME_KEY = 'userName';
    private IS_LOGGED_IN = 'isLoggedIn';
    private SELECTED_REPO = 'selectedRepo';
    private TOKEN = '';

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

    setSelectedRepo(repo: RepoInfo): void {
        localStorage.setItem(this.SELECTED_REPO, JSON.stringify(repo));
    }

    getSelectedRepo(): RepoInfo {
        return JSON.parse(localStorage.getItem(this.SELECTED_REPO) as string);
    }

    setGithubAccessToken(token: string): void {
        localStorage.setItem(this.TOKEN, token);
    }

    getGithubAccessToken(): string {
        return localStorage.getItem(this.TOKEN) as string;
    }

    clear(): void {
        localStorage.clear();
    }
}

export const sessionSaver = new SessionSaver();

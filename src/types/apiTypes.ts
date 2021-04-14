export interface UserData {
    login: string;
    name: string;
    avatarUrl: string;
    company: string;
    location: string;
    email: string;
    blog: string;
    repos: string;
}

export interface RepoInfo {
    id: number;
    name: string;
    owner: string;
    ownerAvatar: string;
    description: string;
    cloneUrl: string;
    sshUrl: string;
    forksCount: number;
    updatedAt: string;
    stargazersCount: number;
    language: string;
    url: string;
    pushed_at: string;
    isFork: boolean;
}

export interface Languages {
    [name: string]: number;
}

export interface Pull {
    title: string;
    state: string;
    url: string;
    closedAt: string;
}

export interface Issue {
    title: string;
    state: string;
    url: string;
    closedAt: string;
}

export interface RepoData {
    info: RepoInfo;
    languages: Languages;
    pullsList: Pull[];
    issuesList: Issue[];
}
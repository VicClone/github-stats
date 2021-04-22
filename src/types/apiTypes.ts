export interface UserInfo {
    login: string;
    name: string;
    avatarUrl: string;
    company: string;
    location: string;
    email: string;
    websiteUrl: string;
}

export interface RepoInfo {
    id: string;
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
    pushedAt: string;
    isFork: boolean;
}

export interface RepoInfoGraphQl {
    edges: RepoInfo[];
}

export interface UserDataGraphQl {
    user: UserData;
}

export interface UserData {
    login: string;
    name: string;
    avatarUrl: string;
    company: string;
    location: string;
    email: string;
    websiteUrl: string;
    repositories: {
        edges: {
            node: RepoInfo;
        }[];
    };
}

export interface UserDataGrVars {
    login: string;
}

export interface RepoDataGraphQl {
    repository: {
        id: string;
        createdAt: string;
        description: string;
        forkCount: number;
        isFork: boolean;
        name: string;
        url: string;
        owner: {
            login: string;
            avatarUrl: string;
        };
        sshUrl: string;
        stargazerCount: number;
        updatedAt: string;
        languages: {
            nodes: Language[];
        };
        pullRequests: {
            nodes: Pull[];
        };
        issues: {
            nodes: Issue[];
        };
    };
}

export interface RepoDataGrVars {
    owner: string;
    repoName: string;
}

export interface Language {
    name: string;
    color: string;
}

export interface Pull {
    title: string;
    state: string;
    url: string;
    createdAt: string;
    closedAt: string;
}

export interface Issue {
    title: string;
    state: string;
    url: string;
    createdAt: string;
    closedAt: string;
}

export interface RepoData {
    info: RepoInfo;
    languages: Language[];
    pullsList: Pull[];
    issuesList: Issue[];
}

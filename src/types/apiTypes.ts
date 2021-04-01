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

export interface RepoData {
    id: number;
    name: string;
    owner: string;
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

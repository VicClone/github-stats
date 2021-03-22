import { RepoData } from '../types/apiTypes';

export function sortRepos(a: RepoData, b: RepoData) {
    const stargazersCountA = a.stargazersCount;
    const stargazersCountB = b.stargazersCount;

    if (stargazersCountA === stargazersCountB) {
        const dateUpdateA = new Date(a.updatedAt).getTime();
        const dateUpdateB = new Date(b.updatedAt).getTime();

        return dateUpdateB - dateUpdateA;
    }

    return stargazersCountB - stargazersCountA;
}

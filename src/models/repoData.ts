import { getRepoInfo, getRepoLanguages, getRepoPullsList, getRepoIssuesList } from './api';
import { RepoData } from '../types/apiTypes';

export const getRepoData = (userName: string, repoName: string): Promise<RepoData | void> => {
    const repoInfo: RepoData = {} as RepoData;

    return Promise.all([
        getRepoInfo(userName, repoName),
        getRepoPullsList(userName, repoName),
        getRepoIssuesList(userName, repoName)
    ])
        .then(res => {
            repoInfo.info = res[0];
            repoInfo.languages = res[1];
            repoInfo.issuesList = res[2];

            return repoInfo;
        })
        .catch(error => {
            console.error(error);
        });
};

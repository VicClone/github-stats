import { getRepoInfo, getRepoLanguages, getRepoPullsList, getRepoIssuesList } from './api';
import { RepoData } from '../types/apiTypes';

export const getRepoData = (userName: string, repoName: string): Promise<RepoData | void> => {
    const repoInfo: RepoData = {} as RepoData;

    return getRepoInfo(userName, repoName)
        .then(res => {
            repoInfo.info = res;

            return getRepoLanguages(userName, repoName);
        })
        .then(res => {
            repoInfo.languages = res;

            return getRepoPullsList(userName, repoName);
        })
        .then(res => {
            repoInfo.pullsList = res;

            return getRepoIssuesList(userName, repoName);
        })
        .then(res => {
            repoInfo.issuesList = res;

            return repoInfo;
        })
        .catch(error => {
            console.error(error);
        });
};

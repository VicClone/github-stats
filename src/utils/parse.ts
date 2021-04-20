import { UserData, UserInfo as UserInfoType, RepoInfo, RepoInfoGraphQl } from '../types/apiTypes';

function parseUserInfo(userData: UserData): UserInfoType {
    return {
        login: userData.login,
        name: userData.name,
        avatarUrl: userData.avatarUrl,
        company: userData.company,
        location: userData.location,
        email: userData.email,
        websiteUrl: userData.websiteUrl
    };
}

function parseRepos(userData: UserData): RepoInfo[] {
    const repositories = userData.repositories.edges.map(item => item.node);

    return repositories;
}

export { parseUserInfo, parseRepos };

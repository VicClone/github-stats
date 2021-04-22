import { CollectionsBookmarkOutlined } from '@material-ui/icons';
import { UserData, UserInfo as UserInfoType, RepoInfo, RepoInfoGraphQl } from '../types/apiTypes';
import { LanguageStats } from '../types/appTypes';

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

function getPercentLanguages(languageStats: LanguageStats, numberLanguages: number) {
    const languageNames = Object.keys(languageStats);
    const languagesStatsInPercents = [];

    for (const languageName of languageNames) {
        const percent = Math.round((languageStats[languageName] / numberLanguages) * 100);
        languagesStatsInPercents.push({
            name: languageName,
            percent: percent
        });
    }

    return languagesStatsInPercents;
}

function getStatsLanguages(repos: RepoInfo[]) {
    const languageStats: LanguageStats = {};
    let numberLanguages = 0;

    for (const repo of repos) {
        for (const language of repo.languages.nodes) {
            numberLanguages++;

            if (languageStats[language.name]) {
                languageStats[language.name]++;
            } else {
                languageStats[language.name] = 1;
            }
        }
    }

    return getPercentLanguages(languageStats, numberLanguages);
}

export { parseUserInfo, parseRepos, getStatsLanguages };

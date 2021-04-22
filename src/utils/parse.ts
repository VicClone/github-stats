import { CollectionsBookmarkOutlined } from '@material-ui/icons';
import { UserData, UserInfo as UserInfoType, RepoInfo, RepoInfoGraphQl } from '../types/apiTypes';
import { LanguageStats, CommitedDatesNumbers } from '../types/appTypes';

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

function getCommitedDates(repos: RepoInfo[]) {
    const commitedDates = [];

    for (const repo of repos) {
        if (!repo.defaultBranchRef) continue;

        const enges = repo.defaultBranchRef.target.history.edges;

        for (const enge of enges) {
            commitedDates.push(enge.node.committedDate);
        }
    }

    return commitedDates;
}

function getCommitsGroupMonth(commitedDates: string[]) {
    const commitsByMonth: CommitedDatesNumbers = {};

    for (const commitedDate of commitedDates) {
        const yearAndMonth = commitedDate.substring(0, 7);

        if (commitsByMonth[yearAndMonth]) {
            commitsByMonth[yearAndMonth]++;
        } else {
            commitsByMonth[yearAndMonth] = 1;
        }
    }

    return commitsByMonth;
}

function getCommitedDatesFormatedChart(commitedDates: CommitedDatesNumbers) {
    const yearsAndmonths = Object.keys(commitedDates);
    const commitedDatesFormatedChart = [];

    for (const yearAndMonth of yearsAndmonths) {
        commitedDatesFormatedChart.push({
            month: yearAndMonth,
            number: commitedDates[yearAndMonth]
        });
    }

    return commitedDatesFormatedChart;
}

function getCommitFrequency(repos: RepoInfo[]) {
    const commitedDates = getCommitedDates(repos);

    const commitedDatesGroupMonth = getCommitsGroupMonth(commitedDates);

    const commitedDatesFormatedChart = getCommitedDatesFormatedChart(commitedDatesGroupMonth);

    commitedDatesFormatedChart.sort((a, b) => a.month.localeCompare(b.month));

    return commitedDatesFormatedChart;
}

export { parseUserInfo, parseRepos, getStatsLanguages, getCommitFrequency };

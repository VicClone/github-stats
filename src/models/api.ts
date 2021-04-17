import getOptionsForGithub from '../utils/optionsGithubApi';
import { sortRepos } from '../utils/sort';
import { UserData, RepoInfo } from '../types/apiTypes';
import { isEmptyBindingElement } from 'typescript';
import { sessionSaver } from '../utils/SessionSaver';

export const authenticate = (proxyUrl: string, code: string): Promise<string | void> => {
    return fetch(proxyUrl, {
        method: 'POST',
        body: JSON.stringify({ code })
    })
        .then(response => {
            return response.json();
        })
        .then(accessToken => {
            sessionSaver.setGithubAccessToken(accessToken);

            return 'isLoggedIn';
        })
        .catch(error => {
            console.log(error);
        });
};

export const getUserData = (username: string): Promise<UserData | Error> => {
    return fetch(`https://api.github.com/users/${username}`, getOptionsForGithub())
        .then(response => {
            if (!response.ok) throw new Error(response.status.toString());

            return response.json();
        })
        .then(data => {
            return {
                login: data.login,
                name: data.name,
                avatarUrl: data.avatar_url,
                company: data.company,
                location: data.location,
                email: data.email,
                blog: data.blog,
                repos: data.public_repos
            };
        })
        .catch(error => {
            return error;
        });
};

export const getUserRepos = (username: string): Promise<RepoInfo[] | Error> => {
    return fetch(`https://api.github.com/users/${username}/repos?per_page=1000`, getOptionsForGithub())
        .then(response => {
            if (!response.ok) throw new Error(response.status.toString());

            return response.json();
        })
        .then(data => {
            const repos = data.map((item: any) => {
                return {
                    id: item.id,
                    name: item.name,
                    owner: item.owner.login,
                    description: item.description,
                    cloneUrl: item.clone_url,
                    sshUrl: item.ssh_url,
                    forksCount: item.forks_count,
                    isFork: item.fork,
                    updatedAt: item.updated_at,
                    stargazersCount: item.stargazers_count,
                    language: item.language,
                    url: item.html_url
                };
            });

            const reposSorted = repos.sort(sortRepos);

            return reposSorted;
        })
        .catch(error => {
            return error;
        });
};

export const getRepoContributorsCount = (userName: string, repoName: string): Promise<number | Error> => {
    return fetch(`https://api.github.com/repos/${userName}/${repoName}/contributors`, getOptionsForGithub())
        .then(response => {
            if (!response.ok) throw new Error(response.status.toString());

            return response.json();
        })
        .then(data => {
            return data.length;
        })
        .catch(error => {
            return error;
        });
};

export const getRepoInfo = (userName: string, repoName: string) => {
    return fetch(`https://api.github.com/repos/${userName}/${repoName}`, getOptionsForGithub())
        .then(response => {
            if (!response.ok) throw new Error(response.status.toString());

            return response.json();
        })
        .then(data => {
            return {
                id: data.id,
                name: data.name,
                owner: data.owner.login,
                ownerAvatar: data.owner.avatar_url,
                description: data.description,
                cloneUrl: data.clone_url,
                sshUrl: data.ssh_url,
                forksCount: data.forks_count,
                isFork: data.fork,
                updatedAt: data.updated_at,
                stargazersCount: data.stargazers_count,
                language: data.language,
                url: data.html_url
            };
        })
        .catch(error => {
            return error;
        });
};

export const getRepoLanguages = (userName: string, repoName: string) => {
    return fetch(`https://api.github.com/repos/${userName}/${repoName}/languages`, getOptionsForGithub())
        .then(response => {
            if (!response.ok) throw new Error(response.status.toString());

            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            return error;
        });
};

export const getRepoPullsList = (userName: string, repoName: string) => {
    return fetch(`https://api.github.com/repos/${userName}/${repoName}/pulls?state=all`, getOptionsForGithub())
        .then(response => {
            if (!response.ok) throw new Error(response.status.toString());

            return response.json();
        })
        .then(data => {
            const pulls = data.map((pull: any) => {
                return {
                    title: pull.title,
                    state: pull.state,
                    url: pull.url,
                    closedAt: pull.close_at
                };
            });

            return pulls;
        })
        .catch(error => {
            return error;
        });
};

export const getRepoIssuesList = (userName: string, repoName: string) => {
    return fetch(`https://api.github.com/repos/${userName}/${repoName}/issues?state=all`, getOptionsForGithub())
        .then(response => {
            if (!response.ok) throw new Error(response.status.toString());

            return response.json();
        })
        .then(data => {
            const issues = data.map((issue: any) => {
                return {
                    title: issue.title,
                    state: issue.state,
                    url: issue.url,
                    closedAt: issue.close_at
                };
            });

            return issues;
        })
        .catch(error => {
            return error;
        });
};

export const getCommitsByUser = (userName: string, userEmail: string) => {
    return fetch(`https://api.github.com/users/${userName}/events`, getOptionsForGithub())
        .then(response => {
            if (!response.ok) throw new Error(response.status.toString());

            return response.json();
        })
        .then(events => {
            const eventsFiltered = events.filter((event: any) => {
                return (
                    event.type === 'PushEvent' &&
                    event.payload.commits.some((commit: any) => commit.author.email === userEmail)
                );
            });

            return eventsFiltered;
        })
        .catch(error => {
            return error;
        });
};

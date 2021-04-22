import { gql } from '@apollo/client';

export const GET_REPO_DATA = gql`
    query GetRepoData($owner: String!, $repoName: String!) {
        repository(name: $repoName, owner: $owner) {
            id
            createdAt
            description
            forkCount
            homepageUrl
            isFork
            name
            url
            owner {
                login
                avatarUrl
            }
            sshUrl
            stargazerCount
            updatedAt
            languages(first: 100) {
                nodes {
                    name
                    color
                }
            }
            pullRequests(first: 100) {
                nodes {
                    closedAt
                    createdAt
                    state
                    url
                    title
                }
            }
            issues(first: 100) {
                nodes {
                    closedAt
                    createdAt
                    state
                    url
                    title
                }
            }
        }
    }
`;

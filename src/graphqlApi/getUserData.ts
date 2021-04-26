import { gql } from '@apollo/client';

export const GET_USER_DATA = gql`
    query GetUserData($login: String!) {
        user(login: $login) {
            login
            name
            avatarUrl
            company
            location
            email
            bio
            websiteUrl
            repositories(first: 100, orderBy: { field: UPDATED_AT, direction: DESC }) {
                edges {
                    node {
                        id
                        name
                        owner {
                            login
                            avatarUrl
                        }
                        description
                        sshUrl
                        url
                        forkCount
                        stargazerCount
                        languages(first: 100) {
                            nodes {
                                color
                                name
                            }
                        }
                        pushedAt
                        isFork
                        createdAt
                        updatedAt
                        defaultBranchRef {
                            target {
                                ... on Commit {
                                    history(first: 100) {
                                        edges {
                                            node {
                                                ... on Commit {
                                                    committedDate
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

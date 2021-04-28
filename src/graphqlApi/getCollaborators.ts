import { gql } from '@apollo/client';

export const GET_COLLABORATORS = gql`
    query GetRepoData($login: String!) {
        user(login: $login) {
            repositories(first: 60, orderBy: { field: UPDATED_AT, direction: DESC }) {
                edges {
                    node {
                        assignableUsers(first: 100) {
                            edges {
                                node {
                                    name
                                    login
                                    avatarUrl
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

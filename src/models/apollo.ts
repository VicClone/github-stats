import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

function createApolloClient(token: string) {
    const GITHUB_BASE_URL = 'https://api.github.com/graphql';

    const httpLink = new HttpLink({
        uri: GITHUB_BASE_URL,
        headers: {
            authorization: `bearer ${token}`
        }
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path }) =>
                console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
            );
        }

        if (networkError) {
            console.error(`[Network error]: ${networkError}`);
        }
    });

    const link = ApolloLink.from([errorLink, httpLink]);

    const cache = new InMemoryCache();

    return new ApolloClient({
        link,
        cache
    });
}

export default createApolloClient;

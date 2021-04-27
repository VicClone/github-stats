import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ApolloProvider } from '@apollo/client/react';
import { sessionSaver } from './utils/SessionSaver';

const GITHUB_BASE_URL = 'https://api.github.com/graphql';
const TOKEN_ACCESS_GITHUB = sessionSaver.getGithubAccessToken() || '';

const httpLink = new HttpLink({
    uri: GITHUB_BASE_URL,
    headers: {
        authorization: `bearer ${TOKEN_ACCESS_GITHUB}`
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

const client = new ApolloClient({
    link,
    cache
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

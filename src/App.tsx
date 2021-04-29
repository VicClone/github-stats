import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { initialState, reducer } from './store/reducer';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { AuthContextType } from './types/appTypes';
import { Header } from './components/Header';
import { Repository } from './components/Repository/Repository';
import { withRouter } from 'react-router';
import { ApolloProvider } from '@apollo/client/react';
import createApolloClient from './models/apollo';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const AuthContext = createContext<AuthContextType>({ state: initialState, dispatch: () => {} });

export const App: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const apolloClient = createApolloClient(state.githubAccessToken);

    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            <ApolloProvider client={apolloClient}>
                <Router>
                    <Header />
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route exact path="/" component={withRouter(Home)} />
                        <Route exact path="/:searched" component={withRouter(Home)} />
                        <Route exact path="/repository/:owner/:name" component={withRouter(Repository)} />
                    </Switch>
                </Router>
            </ApolloProvider>
        </AuthContext.Provider>
    );
};

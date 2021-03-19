import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { initialState, reducer } from './store/reducer';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { AuthContextType } from './types/appTypes';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const AuthContext = createContext<AuthContextType>({ state: initialState, dispatch: () => {} });

export const App: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
};

import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../App';
import { logOutUserAction } from '../store/actions';
import {
    getUserData,
    getUserRepos,
    getRepoInfo,
    getRepoPullsList,
    getRepoIssuesList,
    getCommitsByUser
} from '../models/api';
import { AuthContextType } from '../types/appTypes';

export const Home: React.FC = () => {
    const { state, dispatch } = useContext<AuthContextType>(AuthContext);

    if (!state.isLoggedIn) {
        return <Redirect to="/login" />;
    }

    const { userName } = state;

    const handleLogout = (): void => {
        dispatch(logOutUserAction());
    };

    const getUserInfo = (userName: string) => {
        getUserData(userName)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });

        getUserRepos(userName)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getRepository = (userName: string, repoName: string) => {
        getRepoInfo(userName, repoName)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });

        getRepoPullsList(userName, repoName)
            .then(data => {
                console.log('pulls:');
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });

        getRepoIssuesList(userName, repoName)
            .then(data => {
                console.log('issues:');
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getCommits = (userName: string, email: string) => {
        getCommitsByUser(userName, email)
            .then(data => {
                console.log('issues:');
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="container">
            <div>
                <button onClick={() => handleLogout()}>Logout</button>
            </div>
            <div>
                <div className="content-container">
                    <span>{userName}</span>
                </div>
            </div>
            <div>
                <button
                    onClick={() => {
                        getUserInfo('sethvargo');
                    }}
                >
                    Get user data
                </button>
            </div>
            <div>
                <button
                    onClick={() => {
                        getRepository('sethvargo', 'go-envconfig');
                    }}
                >
                    Get repo info
                </button>
            </div>
            <div>
                <button
                    onClick={() => {
                        getCommits('VicClone', 'evdokimovvik@gmail.com');
                    }}
                >
                    Get commits
                </button>
            </div>
        </div>
    );
};

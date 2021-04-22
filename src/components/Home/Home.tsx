import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../App';
import { getUserData, getUserRepos } from '../../models/api';
import { AuthContextType } from '../../types/appTypes';
import { Container, Card, CardHeader, Grid, Box, Avatar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import SearchBar from 'material-ui-search-bar';
import { RepoInfo, UserData } from '../../types/apiTypes';
import './Home.css';
import { sessionSaver } from '../../utils/SessionSaver';
import { RenderUserInfo } from '../UserInfo/UserInfo';
import { RenderReposInfo } from './ReposInfo';

export const Home: React.FC = () => {
    const {
        state: { isLoggedIn }
    } = useContext<AuthContextType>(AuthContext);

    const [searchUserValue, setSearchUserValue] = useState<string>('');
    const [userInfo, setUserInfo] = useState<UserData | null>(null);
    const [userRepos, setUserRepos] = useState<RepoInfo[]>();
    const [error, setError] = useState<Error>();

    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }

    const getUserInfo = (userName: string) => {
        getUserData(userName)
            .then(data => {
                if (data instanceof Error) {
                    setError(data);
                } else {
                    setUserInfo(data as UserData);
                }
            })
            .catch(error => {
                console.log(error);
            });

        getUserRepos(userName)
            .then(data => {
                setUserRepos(data as RepoInfo[]);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleSearch = (searchValue: string) => {
        setSearchUserValue(searchValue);
    };

    const searchUser = () => {
        sessionSaver.setUserName(searchUserValue);
        getUserInfo(searchUserValue);
    };

    return (
        <Container maxWidth="md">
            <Box mt={20}>
                <SearchBar value={searchUserValue} onChange={handleSearch} onRequestSearch={searchUser} />
            </Box>
            {userInfo && (
                <Box mt={10}>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                        <Grid item xs={12}>
                            <Card>
                                <CardHeader
                                    avatar={<Avatar alt="name name" src={userInfo?.avatarUrl} />}
                                    title={userInfo?.name}
                                    subheader={userInfo?.location}
                                />
                                <RenderUserInfo userInfo={userInfo} />
                                {userRepos && <RenderReposInfo userRepos={userRepos} />}
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            )}
            {error && (
                <Box mt={10}>
                    <Alert severity="error">
                        <AlertTitle>Error {error.message}</AlertTitle>
                        {error.message === '404' && 'Пользователь не найден'}
                    </Alert>
                </Box>
            )}
        </Container>
    );
};

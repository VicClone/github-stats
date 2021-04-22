import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../App';
import { logOutUserAction } from '../../store/actions';
import { getUserData, getUserRepos } from '../../models/api';
import { AuthContextType } from '../../types/appTypes';
import {
    Container,
    Card,
    CardHeader,
    Grid,
    Box,
    CardContent,
    Avatar,
    Typography,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Star as StarIcon } from '@material-ui/icons';
import SearchBar from 'material-ui-search-bar';
import { Link } from 'react-router-dom';
import { RepoInfo, UserData } from '../../types/apiTypes';
import './Home.css';
import { sessionSaver } from '../../utils/SessionSaver';
import { RenderUserInfo } from './UserInfo';
import { RenderReposInfo } from './ReposInfo';

export const Home: React.FC = () => {
    const {
        state: { isLoggedIn },
        dispatch
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

    const renderReposInfo = () => {
        const handleRepoLink = (repo: RepoInfo) => {
            sessionSaver.setSelectedRepo(repo);
        };

        return (
            <CardContent>
                <Typography component="span" variant="body1" color="textPrimary" className="repoHeader">
                    Репозитории:
                </Typography>
                <List>
                    {userRepos?.map(repo => {
                        return (
                            <ListItem key={repo.id}>
                                <ListItemText
                                    primary={repo.name}
                                    secondary={
                                        <>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                                className="repoStar"
                                            >
                                                <StarIcon /> {repo.stargazersCount}
                                            </Typography>
                                            {repo.language}
                                        </>
                                    }
                                />
                                <Link to={`/repository/${repo.name}`} onClick={() => handleRepoLink(repo)}>
                                    Перейти
                                </Link>
                            </ListItem>
                        );
                    })}
                </List>
            </CardContent>
        );
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
                                    avatar={<Avatar alt="name name" src={userInfo?.avatarUrl}></Avatar>}
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

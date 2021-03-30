import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../App';
import { logOutUserAction } from '../../store/actions';
import {
    getUserData,
    getUserRepos,
    getRepoInfo,
    getRepoPullsList,
    getRepoIssuesList,
    getCommitsByUser
} from '../../models/api';
import { AuthContextType } from '../../types/appTypes';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmailIcon from '@material-ui/icons/Email';
import WorkIcon from '@material-ui/icons/Work';
import LanguageIcon from '@material-ui/icons/Language';
import StarIcon from '@material-ui/icons/Star';
import SearchBar from 'material-ui-search-bar';
import { Link } from '@material-ui/core';
import { RepoData, UserData } from '../../types/apiTypes';
import './Home.css';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345
    },
    media: {
        height: 0,
        paddingTop: '56.25%' // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    avatar: {
        backgroundColor: 'red'
    }
}));

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

export const Home: React.FC = () => {
    const {
        state: { isLoggedIn },
        dispatch
    } = useContext<AuthContextType>(AuthContext);

    const [searchUserValue, setSearchUserValue] = useState<string>('');
    const [userInfo, setUserInfo] = useState<UserData | null>(null);
    const [userRepos, setUserRepos] = useState<RepoData[]>();

    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }

    const handleLogout = (): void => {
        dispatch(logOutUserAction());
    };

    const getUserInfo = (userName: string) => {
        getUserData(userName)
            .then(data => {
                console.log(data);
                setUserInfo(data as UserData);
            })
            .catch(error => {
                console.log(error);
            });

        getUserRepos(userName)
            .then(data => {
                console.log(data);
                setUserRepos(data as RepoData[]);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleSearch = (searchValue: string) => {
        setSearchUserValue(searchValue);
    };

    const searchUser = () => {
        getUserInfo(searchUserValue);
    };

    const renderUserInfo = () => {
        return (
            <CardContent>
                <List>
                    {userInfo?.email && (
                        <ListItem>
                            <ListItemIcon>
                                <EmailIcon></EmailIcon>
                            </ListItemIcon>
                            <ListItemText>{userInfo?.email}</ListItemText>
                        </ListItem>
                    )}
                    {userInfo?.company && (
                        <ListItem>
                            <ListItemIcon>
                                <WorkIcon></WorkIcon>
                            </ListItemIcon>
                            <ListItemText>{userInfo?.company}</ListItemText>
                        </ListItem>
                    )}
                    {userInfo?.blog && (
                        <ListItem>
                            <ListItemIcon>
                                <LanguageIcon></LanguageIcon>
                            </ListItemIcon>
                            <ListItemText>Сайт</ListItemText>
                        </ListItem>
                    )}
                </List>
            </CardContent>
        );
    };

    const renderReposInfo = () => {
        console.log(userRepos);
        return (
            <CardContent>
                <Typography component="span" variant="body1" color="textPrimary" className="repoHeader">
                    Репозитории:
                </Typography>
                <List>
                    {userRepos?.map(repo => {
                        return (
                            <ListItem key={repo.updatedAt}>
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
                                <Link href="/repository/1">Перейти</Link>
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
                                {renderUserInfo()}
                                {renderReposInfo()}
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Container>
    );
};

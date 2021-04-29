import React, { useState } from 'react';
import {
    Grid,
    Card,
    CardHeader,
    Avatar,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Container,
    Button,
    Link,
    CircularProgress,
    CardActions
} from '@material-ui/core';
import { Face, Description, Grade, CallSplit, AccountTree, Update } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import { RepoData, RepoDataGraphQl, RepoDataGrVars } from '../../types/apiTypes';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { RepositoryGraphs } from './RepositoryGraphs/RepositoryGraphs';
import { getAverageClosingTimeData } from '../../utils/averageClosingTimeStats';
import { AverageClosingTimeData } from '../../types/appTypes';
import { GET_REPO_DATA } from '../../graphqlApi/getRepoData';
import { useQuery } from '@apollo/client';
import { parseDatetime } from '../../utils/parse';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(() =>
    createStyles({
        actions: {
            marginTop: '15px'
        }
    })
);

export const Repository: React.FC = () => {
    const history = useHistory();
    const { owner, name } = useParams<{ owner: string; name: string }>();
    const userName = owner;
    const repoName = name;

    const goBack = () => {
        history.goBack();
    };

    const { loading, error, data } = useQuery<RepoDataGraphQl, RepoDataGrVars>(GET_REPO_DATA, {
        variables: { owner: userName, repoName: repoName }
    });

    const classes = useStyles();
    const [isToggleCopied, setToggleCopied] = useState(false);

    if (!(userName && repoName)) {
        return null;
    }

    if (loading) {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Alert severity="error">
                <AlertTitle>{error.message}</AlertTitle>
            </Alert>
        );
    }

    if (!data) {
        return (
            <Alert severity="error">
                <AlertTitle>No data</AlertTitle>
            </Alert>
        );
    }

    const repoData = data.repository;
    const { isFork, forkCount, stargazerCount, updatedAt, sshUrl } = repoData;
    const pullRequests = repoData.pullRequests.nodes;
    const issues = repoData.issues.nodes;
    const pullRequestsStats: AverageClosingTimeData = getAverageClosingTimeData(pullRequests);
    const issuesStats: AverageClosingTimeData = getAverageClosingTimeData(issues);

    const handleCloneBtn = (sshUrl: string) => {
        setToggleCopied(true);
        navigator.clipboard.writeText(sshUrl);
        setTimeout(() => {
            setToggleCopied(false);
        }, 2000);
    };

    const renderListItem = (text: string, icon: any) => {
        return (
            <ListItem>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{text}</ListItemText>
            </ListItem>
        );
    };

    const getIsForkText = (repoData: RepoData) => (repoData.isFork ? 'Форк' : 'Не форк');
    const getLastUpdateText = (repoData: RepoData) => `Последнее обновление: ${parseDatetime(repoData.updatedAt)}`;
    const getCountForkText = (repoData: RepoData) => `Количество форков: ${repoData.forkCount}`;
    const getStargazerCountText = (repoData: RepoData) => `Рейтинг репозитория: ${repoData.stargazerCount}`;

    return (
        <Container maxWidth="md">
            <Box mt={20}>
                <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                    <Grid item xs={12}>
                        {repoData && (
                            <Card>
                                <CardHeader
                                    avatar={
                                        repoData.owner && (
                                            <Avatar alt={repoData.owner.login} src={repoData.owner.avatarUrl} />
                                        )
                                    }
                                    title={repoData.name}
                                    action={
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleCloneBtn(repoData.sshUrl)}
                                        >
                                            Склонировать
                                        </Button>
                                    }
                                />
                                {isToggleCopied && <Alert severity="success">Ссылка скопирована</Alert>}
                                <CardContent>
                                    <List>
                                        {repoData.owner && (
                                            <ListItem>
                                                <ListItemIcon>
                                                    <Face />
                                                </ListItemIcon>
                                                <ListItemText>
                                                    <Link
                                                        href={`https://github.com/${repoData.owner.login}`}
                                                        target="_blank"
                                                    >
                                                        {repoData.owner.login}
                                                    </Link>
                                                </ListItemText>
                                            </ListItem>
                                        )}
                                        {repoData.description && renderListItem(repoData.description, <Description />)}
                                        {renderListItem(getStargazerCountText(repoData), <Grade />)}
                                        {renderListItem(getCountForkText(repoData), <CallSplit />)}
                                        {renderListItem(getIsForkText(repoData), <AccountTree />)}
                                        {renderListItem(getLastUpdateText(repoData), <Update />)}
                                    </List>
                                    <RepositoryGraphs pullRequestsStats={pullRequestsStats} issuesStats={issuesStats} />
                                    <CardActions className={classes.actions}>
                                        <Button variant="contained" color="primary" onClick={() => goBack()}>
                                            Назад
                                        </Button>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

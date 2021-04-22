import React, { useEffect, useState } from 'react';
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
    CardActions,
    Paper
} from '@material-ui/core';
import { Face, Description, Grade, CallSplit, AccountTree } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { sessionSaver } from '../../utils/SessionSaver';
import { RepoData } from '../../types/apiTypes';
import { getRepoData } from '../../models/repoData';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AverageClosingTimeStats } from './AverageClosingTimeStats';
import { AverageClosingTimeData } from '../../types/appTypes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        actions: {
            marginTop: '15px'
        }
    })
);

const pullRequestsStats: AverageClosingTimeData = {
    '2020': [
        { month: '1', averageTimeInHours: 5 },
        { month: '2', averageTimeInHours: 1 },
        { month: '3', averageTimeInHours: 3 },
        { month: '4', averageTimeInHours: 10 }
    ],
    '2021': [
        { month: '1', averageTimeInHours: 10 },
        { month: '2', averageTimeInHours: 2 },
        { month: '3', averageTimeInHours: 5 },
        { month: '4', averageTimeInHours: 12 },
        { month: '5', averageTimeInHours: 15 }
    ]
};

const issuesStats: AverageClosingTimeData = {
    '2020': [
        { month: '1', averageTimeInHours: 7 },
        { month: '2', averageTimeInHours: 17 },
        { month: '3', averageTimeInHours: 3 },
        { month: '4', averageTimeInHours: 4 }
    ],
    '2021': [
        { month: '1', averageTimeInHours: 10 },
        { month: '2', averageTimeInHours: 2 },
        { month: '3', averageTimeInHours: 5 },
        { month: '4', averageTimeInHours: 12 },
        { month: '5', averageTimeInHours: 10 }
    ]
};

export const Repository: React.FC = () => {
    const classes = useStyles();
    const [repo, setRepo] = useState<RepoData>();
    const [isToggleCopied, setToggleCopied] = useState(false);

    const userName = sessionSaver.getUserName();
    const repoName = sessionSaver.getSelectedRepo().name;

    useEffect(() => {
        getRepoData(userName as string, repoName as string).then(res => {
            setRepo(res as RepoData);
        });
    }, []);

    const handleCloneBtn = (sshUrl: string) => {
        setToggleCopied(true);
        navigator.clipboard.writeText(sshUrl);
        setTimeout(() => {
            setToggleCopied(false);
        }, 2000);
    };

    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    return (
        <Container maxWidth="md">
            <Box mt={20}>
                <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                    <Grid item xs={12}>
                        {repo && (
                            <Card>
                                <CardHeader
                                    avatar={<Avatar alt={repo.info.name} src={repo.info.ownerAvatar} />}
                                    title={repo.info.name}
                                    action={
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleCloneBtn(repo.info.sshUrl)}
                                        >
                                            Склонировать
                                        </Button>
                                    }
                                />
                                {isToggleCopied && <Alert severity="success">Ссылка скопирована</Alert>}
                                <CardContent>
                                    <List>
                                        <ListItem>
                                            <ListItemIcon>
                                                <Face></Face>
                                            </ListItemIcon>
                                            <ListItemText>
                                                <Link href={`https://github.com/${repo.info.owner}`} target="_blank">
                                                    {repo.info.owner}
                                                </Link>
                                            </ListItemText>
                                        </ListItem>
                                        {repo.info.description && (
                                            <ListItem>
                                                <ListItemIcon>
                                                    <Description></Description>
                                                </ListItemIcon>
                                                <ListItemText>{repo.info.description}</ListItemText>
                                            </ListItem>
                                        )}
                                        <ListItem>
                                            <ListItemIcon>
                                                <Grade></Grade>
                                            </ListItemIcon>
                                            <ListItemText>
                                                Рейтинг репозитория: {repo.info.stargazersCount}
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <CallSplit></CallSplit>
                                            </ListItemIcon>
                                            <ListItemText>Количество форков: {repo.info.forksCount}</ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <AccountTree />
                                            </ListItemIcon>
                                            <ListItemText>{repo.info.isFork ? 'Форк' : 'Не форк'}</ListItemText>
                                        </ListItem>
                                    </List>
                                    <div>
                                        <Paper>
                                            <AverageClosingTimeStats
                                                title={'Статистика времени закрытий пулл реквестов по месяцам'}
                                                data={pullRequestsStats}
                                            />
                                        </Paper>
                                        <Paper>
                                            <AverageClosingTimeStats
                                                title={'Статистика времени закрытий ишью по месяцам'}
                                                data={issuesStats}
                                            />
                                        </Paper>
                                    </div>
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

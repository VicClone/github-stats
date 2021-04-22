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
    IconButton,
    Link,
    CircularProgress
} from '@material-ui/core';
import { Face, Description, Grade, CallSplit, AccountTree, ArrowBack } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import { sessionSaver } from '../utils/SessionSaver';
import { RepoData, RepoDataGraphQl, RepoDataGrVars } from '../types/apiTypes';
import { useHistory } from 'react-router-dom';

import { GET_REPO_DATA } from '../graphqlApi/getRepoData';
import { useQuery } from '@apollo/client';

export const Repository: React.FC = () => {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    const userName = sessionSaver.getUserName() as string;
    const repoName = sessionSaver.getSelectedRepo().name as string;

    const { loading, error, data } = useQuery<RepoDataGraphQl, RepoDataGrVars>(GET_REPO_DATA, {
        variables: { owner: userName, repoName: repoName }
    });

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

    const handleCloneBtn = (sshUrl: string) => {
        setToggleCopied(true);
        navigator.clipboard.writeText(sshUrl);
        setTimeout(() => {
            setToggleCopied(false);
        }, 2000);
    };

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
                                            <Avatar alt={repoData.owner.login} src={repoData.owner.avatarUrl}></Avatar>
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
                                                    <Face></Face>
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
                                        {repoData.description && (
                                            <ListItem>
                                                <ListItemIcon>
                                                    <Description></Description>
                                                </ListItemIcon>
                                                <ListItemText>{repoData.description}</ListItemText>
                                            </ListItem>
                                        )}
                                        <ListItem>
                                            <ListItemIcon>
                                                <Grade></Grade>
                                            </ListItemIcon>
                                            <ListItemText>Рейтинг репозитория: {repoData.stargazerCount}</ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <CallSplit></CallSplit>
                                            </ListItemIcon>
                                            <ListItemText>Количество форков: {repoData.forkCount}</ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <AccountTree />
                                            </ListItemIcon>
                                            <ListItemText>{repoData.isFork ? 'Форк' : 'Не форк'}</ListItemText>
                                        </ListItem>
                                    </List>
                                    <Button variant="contained" color="primary" onClick={() => goBack()}>
                                        Назад
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

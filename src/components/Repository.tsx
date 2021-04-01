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
    Button
} from '@material-ui/core';
import { Face, Description, Grade, CallSplit, AccountTree } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { sessionSaver } from '../utils/SessionSaver';
import { RepoData } from '../types/apiTypes';
import { getRepoData } from '../models/repoData';

export const Repository: React.FC = () => {
    const [repo, setRepo] = useState<RepoData>();

    useEffect(() => {
        getRepoData().then(res => {
            setRepo(res as RepoData);
        });
        // setRepo(sessionSaver.getSelectedRepo());
    }, []);

    const [isToggleCopied, setToggleCopied] = useState(false);

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
                        {repo && (
                            <Card>
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            alt="name name"
                                            src="https://material-ui.com/static/images/avatar/1.jpg"
                                        ></Avatar>
                                    }
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
                                            <ListItemText>{repo.info.owner}</ListItemText>
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
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

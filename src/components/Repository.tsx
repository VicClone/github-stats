import React, { useContext, useEffect, useState } from 'react';
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
    Container
} from '@material-ui/core';
import { Face, Description, Grade, CallSplit } from '@material-ui/icons';
import { AuthContextType } from '../types/appTypes';
import { AuthContext } from '../App';
import { sessionSaver } from '../utils/SessionSaver';
import { RepoData } from '../types/apiTypes';

export const Repository: React.FC = () => {
    const [repo, setRepo] = useState<RepoData>();

    useEffect(() => {
        setRepo(sessionSaver.getSelectedRepo());
    }, []);

    return (
        <Container maxWidth="md">
            <Box mt={20}>
                <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt="name name"
                                        src="https://material-ui.com/static/images/avatar/1.jpg"
                                    ></Avatar>
                                }
                                title={repo?.name}
                            />
                            <CardContent>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Face></Face>
                                        </ListItemIcon>
                                        <ListItemText>Автор</ListItemText>
                                    </ListItem>
                                    {repo?.description && (
                                        <ListItem>
                                            <ListItemIcon>
                                                <Description></Description>
                                            </ListItemIcon>
                                            <ListItemText>{repo?.description}</ListItemText>
                                        </ListItem>
                                    )}
                                    <ListItem>
                                        <ListItemIcon>
                                            <Grade></Grade>
                                        </ListItemIcon>
                                        <ListItemText>Рейтинг репозитория: {repo?.stargazersCount}</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CallSplit></CallSplit>
                                        </ListItemIcon>
                                        <ListItemText>Количество форков: {repo?.forksCount}</ListItemText>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

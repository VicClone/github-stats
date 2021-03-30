import React from 'react';
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

export const Repository: React.FC = () => {
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
                                title="First Repo"
                            />
                            <CardContent>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Face></Face>
                                        </ListItemIcon>
                                        <ListItemText>Энтони</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Description></Description>
                                        </ListItemIcon>
                                        <ListItemText>Здесь должно быть описание репозитория</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Grade></Grade>
                                        </ListItemIcon>
                                        <ListItemText>Рейтинг репозитория: 20</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CallSplit></CallSplit>
                                        </ListItemIcon>
                                        <ListItemText>Fork</ListItemText>
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

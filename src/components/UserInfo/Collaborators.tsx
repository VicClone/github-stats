import React from 'react';
import { GET_COLLABORATORS } from '../../graphqlApi/getCollaborators';
import { useQuery } from '@apollo/client';
import { CollaboratorsGraphQl, CollaboratorsGrVars } from '../../types/apiTypes';
import { Collaborator } from '../../types/appTypes';
import { getCollaboratorsTop10 } from '../../utils/parse';
import { Box, Avatar, LinearProgress, List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

interface PropsType {
    login: string;
}

const Collaborators = (props: PropsType) => {
    const { loading, error, data } = useQuery<CollaboratorsGraphQl, CollaboratorsGrVars>(GET_COLLABORATORS, {
        variables: { login: props.login }
    });

    if (loading) {
        return (
            <div>
                <LinearProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Box mt={10}>
                <Alert severity="error">
                    <AlertTitle>Что пошло не так...</AlertTitle>
                </Alert>
            </Box>
        );
    }

    if (!data) {
        return <div>No data</div>;
    }

    const collaboratorsTop10 = getCollaboratorsTop10(data.user.repositories);

    const getListItemCollaborators = (collaborators: Collaborator[]) => {
        return collaborators.map(user => {
            return (
                <ListItem
                    key={user.login}
                    button
                    component="a"
                    href={`https://github.com/${user.login}`}
                    target="_blank"
                >
                    <ListItemAvatar>
                        <Avatar alt={user.name} src={user.avatarUrl} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.login} />
                </ListItem>
            );
        });
    };

    return (
        <Box>
            {collaboratorsTop10 && collaboratorsTop10.length > 0 && (
                <List>{getListItemCollaborators(collaboratorsTop10)}</List>
            )}
        </Box>
    );
};

export { Collaborators };

import React from 'react';
import { CardContent, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { UserData } from '../../types/apiTypes';
import { Email as EmailIcon, Work as WorkIcon, Language as LanguageIcon } from '@material-ui/icons';

interface PropsType {
    userInfo: UserData;
}

const RenderUserInfo = (props: PropsType) => {
    return (
        <CardContent>
            <List>
                {props.userInfo.email && (
                    <ListItem>
                        <ListItemIcon>
                            <EmailIcon></EmailIcon>
                        </ListItemIcon>
                        <ListItemText>{props.userInfo.email}</ListItemText>
                    </ListItem>
                )}
                {props.userInfo.company && (
                    <ListItem>
                        <ListItemIcon>
                            <WorkIcon></WorkIcon>
                        </ListItemIcon>
                        <ListItemText>{props.userInfo.company}</ListItemText>
                    </ListItem>
                )}
                {props.userInfo.blog && (
                    <ListItem>
                        <ListItemIcon>
                            <LanguageIcon></LanguageIcon>
                        </ListItemIcon>
                        <ListItemText>{props.userInfo?.blog}</ListItemText>
                    </ListItem>
                )}
            </List>
        </CardContent>
    );
};

export { RenderUserInfo };

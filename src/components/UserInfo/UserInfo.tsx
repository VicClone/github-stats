import React from 'react';
import { CardContent, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { UserInfo as UserInfoType } from '../../types/apiTypes';
import { Email as EmailIcon, Work as WorkIcon, Language as LanguageIcon } from '@material-ui/icons';

interface PropsType {
    userInfo: UserInfoType;
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
                {props.userInfo.websiteUrl && (
                    <ListItem>
                        <ListItemIcon>
                            <LanguageIcon></LanguageIcon>
                        </ListItemIcon>
                        <ListItemText>{props.userInfo.websiteUrl}</ListItemText>
                    </ListItem>
                )}
            </List>
        </CardContent>
    );
};

export { RenderUserInfo };

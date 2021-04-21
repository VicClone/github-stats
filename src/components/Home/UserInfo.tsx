import React from 'react';
import { CardContent, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { UserData } from '../../types/apiTypes';
import { Email as EmailIcon, Work as WorkIcon, Language as LanguageIcon } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import { Chart, ArgumentAxis, ValueAxis, BarSeries, Title } from '@devexpress/dx-react-chart-material-ui';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';
import { scaleBand } from '@devexpress/dx-chart-core';

interface PropsType {
    userInfo: UserData;
}

const RenderUserInfo = (props: PropsType) => {
    const languagesInRepos = [
        {
            name: 'js',
            percent: 20
        },
        {
            name: 'c#',
            percent: 20
        },
        {
            name: 'html',
            percent: 30
        },
        {
            name: 'css',
            percent: 30
        }
    ];

    return (
        <CardContent>
            <Paper>
                <Chart data={languagesInRepos}>
                    <ArgumentScale factory={scaleBand} />
                    <ArgumentAxis />
                    <ValueAxis />

                    <BarSeries valueField="percent" argumentField="name" />
                    <Stack />
                    <Title text="Используемые языки" />
                </Chart>
            </Paper>
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

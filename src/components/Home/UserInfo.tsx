import React from 'react';
import { CardContent, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { UserData } from '../../types/apiTypes';
import { Email as EmailIcon, Work as WorkIcon, Language as LanguageIcon } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import { Chart, Title, PieSeries, Tooltip, Legend } from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';
import { ArgumentScale } from '@devexpress/dx-react-chart';
import { scaleBand } from '@devexpress/dx-chart-core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface PropsType {
    userInfo: UserData;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '50%',
            [theme.breakpoints.down('md')]: {
                width: '100%'
            }
        }
    })
);

const RenderUserInfo = (props: PropsType) => {
    const classes = useStyles();
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
            <Paper className={classes.root}>
                <Chart data={languagesInRepos} height={300}>
                    <ArgumentScale factory={scaleBand} />
                    <PieSeries valueField="percent" argumentField="name" outerRadius={1} />
                    <Legend />
                    <Title text="Статистика использования языков" />
                    <EventTracker />
                    <Tooltip />
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

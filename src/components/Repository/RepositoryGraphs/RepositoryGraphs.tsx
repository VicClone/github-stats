import { CardContent, Paper } from '@material-ui/core';
import { AverageClosingTimeStats } from '../AverageClosingTimeStats';
import React from 'react';
import { AverageClosingTimeData } from '../../../types/appTypes';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        graphs: {
            display: 'flex',
            [theme.breakpoints.down('md')]: {
                display: 'block'
            }
        },
        graph: {
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '48%',
            [theme.breakpoints.down('md')]: {
                width: '100%',
                marginTop: '10px'
            }
        }
    })
);

export const RepositoryGraphs = () => {
    const classes = useStyles();
    return (
        <div className={classes.graphs}>
            <Paper className={classes.graph}>
                <AverageClosingTimeStats
                    title={'Статистика времени закрытий пулл реквестов по месяцам'}
                    data={pullRequestsStats}
                />
            </Paper>
            <Paper className={classes.graph}>
                <AverageClosingTimeStats title={'Статистика времени закрытий ишью по месяцам'} data={issuesStats} />
            </Paper>
        </div>
    );
};

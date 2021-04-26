import { Paper } from '@material-ui/core';
import { AverageClosingTimeStats } from '../AverageClosingTimeStats';
import React from 'react';
import { AverageClosingTimeData } from '../../../types/appTypes';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

interface PropsType {
    pullRequestsStats: AverageClosingTimeData;
    issuesStats: AverageClosingTimeData;
}

export const RepositoryGraphs = (props: PropsType) => {
    const classes = useStyles();
    return (
        <div className={classes.graphs}>
            <Paper className={classes.graph}>
                <AverageClosingTimeStats
                    title={'Статистика времени закрытий пулл реквестов по месяцам'}
                    data={props.pullRequestsStats}
                />
            </Paper>
            <Paper className={classes.graph}>
                <AverageClosingTimeStats
                    title={'Статистика времени закрытий ишью по месяцам'}
                    data={props.issuesStats}
                />
            </Paper>
        </div>
    );
};

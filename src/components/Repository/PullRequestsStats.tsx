import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Chart, ArgumentAxis, ValueAxis, BarSeries, Title } from '@devexpress/dx-react-chart-material-ui';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';
import { scaleBand } from '@devexpress/dx-chart-core';

export const PullRequestsStats = () => {
    const pullRequestsStats = [
        {
            month: 1,
            year: 2021,
            averageTimeInHours: 2
        },
        {
            month: 2,
            year: 2021,
            averageTimeInHours: 3
        },
        {
            month: 3,
            year: 2021,
            averageTimeInHours: 1
        },
        {
            month: 4,
            year: 2021,
            averageTimeInHours: 4.6
        },
        {
            month: 5,
            year: 2021,
            averageTimeInHours: 2.3
        }
    ];
    //
    // const issuesStats = [
    //     {
    //         montn: 1,
    //         year: 2021,
    //         averageTimeInHours: 2
    //     },
    //     {
    //         montn: 2,
    //         year: 2021,
    //         averageTimeInHours: 3
    //     },
    //     {
    //         montn: 3,
    //         year: 2021,
    //         averageTimeInHours: 1
    //     },
    //     {
    //         montn: 4,
    //         year: 2021,
    //         averageTimeInHours: 4.6
    //     },
    //     {
    //         montn: 5,
    //         year: 2021,
    //         averageTimeInHours: 2.3
    //     }
    // ];
    return (
        <Paper>
            <Chart data={pullRequestsStats}>
                <ArgumentScale factory={scaleBand} />
                <ArgumentAxis />
                <ValueAxis />

                <BarSeries valueField="averageTimeInHours" argumentField="month" />
                {/*<BarSeries valueField="middle" argumentField="state" name="Middle" />*/}
                {/*<BarSeries valueField="older" argumentField="state" name="Older" />*/}
                <Title text="Статистика времени закрытий пулл реквестов по месяцам" />
                <Stack />
            </Chart>
        </Paper>
    );
};

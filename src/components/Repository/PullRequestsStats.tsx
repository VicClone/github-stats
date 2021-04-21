import Paper from '@material-ui/core/Paper';
import React, { useState } from 'react';
import { Chart, ArgumentAxis, ValueAxis, BarSeries, Title } from '@devexpress/dx-react-chart-material-ui';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';
import { scaleBand } from '@devexpress/dx-chart-core';
import { MenuItem, Select } from '@material-ui/core';

interface PullRequestsStats {
    [key: string]: PullRequestsStatsAtYear[];
}

const pullRequestsStats: PullRequestsStats = {
    '2020': [
        { month: '1', averageTimeInHours: 50 },
        { month: '2', averageTimeInHours: 100 },
        { month: '3', averageTimeInHours: 30 },
        { month: '4', averageTimeInHours: 107 }
    ],
    '2021': [
        { month: '1', averageTimeInHours: 100 },
        { month: '2', averageTimeInHours: 200 },
        { month: '3', averageTimeInHours: 50 },
        { month: '4', averageTimeInHours: 127 },
        { month: '5', averageTimeInHours: 105 }
    ]
};

interface PullRequestsStatsAtYear {
    month: string;
    averageTimeInHours: number;
}

// eslint-disable-next-line react/display-name
const Label = (symbol: any) => (props: any) => {
    const { text } = props;
    return <ValueAxis.Label {...props} text={text + symbol} />;
};

export const PullRequestsStats = () => {
    const [year, setYear] = useState<any>(2020);
    const [data, setData] = useState<PullRequestsStatsAtYear[]>(pullRequestsStats[year]);

    const onChangeYear = (e: React.ChangeEvent<{ value: any }>) => {
        const { value } = e.target;
        setYear(value);
        setData(pullRequestsStats[value]);
    };

    const getOptions = (): JSX.Element[] => {
        return Object.keys(pullRequestsStats).map(year => {
            return (
                <MenuItem key={year} value={year}>
                    {year}
                </MenuItem>
            );
        });
    };

    const LabelValueAxis = Label(' час');

    return (
        <Paper>
            <Chart data={data}>
                <ArgumentScale factory={scaleBand} />
                <ArgumentAxis />
                <ValueAxis labelComponent={LabelValueAxis} />

                <BarSeries valueField="averageTimeInHours" argumentField="month" />
                <Title text="Статистика времени закрытий пулл реквестов по месяцам" />
                <Stack />
            </Chart>
            <Select id="select" style={{ width: '100px', margin: '10px' }} onChange={onChangeYear} value={year}>
                {getOptions()}
            </Select>
        </Paper>
    );
};

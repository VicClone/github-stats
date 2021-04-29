import React, { useState } from 'react';
import { Chart, ArgumentAxis, ValueAxis, BarSeries, Title } from '@devexpress/dx-react-chart-material-ui';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';
import { scaleBand } from '@devexpress/dx-chart-core';
import { MenuItem, Select } from '@material-ui/core';
import { Label } from './Label';
import { AverageClosingTimeStatsAtYear, AverageClosingTimeData } from '../../types/appTypes';

interface AverageClosingTimeStatsProps {
    title: string;
    data: AverageClosingTimeData;
}

export const AverageClosingTimeStats = (props: AverageClosingTimeStatsProps) => {
    const [year, setYear] = useState<any>(Object.keys(props.data)[0]);
    const [dataAtYear, setDataAtYear] = useState<AverageClosingTimeStatsAtYear[]>(props.data[year]);

    const onChangeYear = (e: React.ChangeEvent<{ value: any }>) => {
        const { value } = e.target;
        setYear(value);
        setDataAtYear(props.data[value]);
    };

    const getOptions = (): JSX.Element[] => {
        return Object.keys(props.data).map(year => {
            return (
                <MenuItem key={year} value={year}>
                    {year}
                </MenuItem>
            );
        });
    };

    const LabelValueAxis = Label(' час');

    return (
        <>
            <Chart data={dataAtYear}>
                <ArgumentScale factory={scaleBand} />
                <ArgumentAxis />
                <ValueAxis labelComponent={LabelValueAxis} />

                <BarSeries valueField="averageTimeInHours" argumentField="month" />
                <Title text={props.title} />
                <Stack />
            </Chart>
            <Select id="select" style={{ width: '100px', margin: '10px' }} onChange={onChangeYear} value={year}>
                {getOptions()}
            </Select>
        </>
    );
};

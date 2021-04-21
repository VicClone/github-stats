import React, { useState } from 'react';
import { Chart, ArgumentAxis, ValueAxis, BarSeries, Title } from '@devexpress/dx-react-chart-material-ui';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';
import { scaleBand } from '@devexpress/dx-chart-core';
import { MenuItem, Select } from '@material-ui/core';
import { Label } from './Label';
import { AverageTimeClosureStatsAtYear, AverageTimeClosureStatsData } from '../../types/appTypes';

interface AverageTimeClosureStatsProps {
    data: AverageTimeClosureStatsData;
    title: string;
}

export const AverageTimeClosureStats = ({ data, title }: AverageTimeClosureStatsProps) => {
    const [year, setYear] = useState<any>(2020);
    const [dataAtYear, setDataAtYear] = useState<AverageTimeClosureStatsAtYear[]>(data[year]);

    const onChangeYear = (e: React.ChangeEvent<{ value: any }>) => {
        const { value } = e.target;
        setYear(value);
        setDataAtYear(data[value]);
    };

    const getOptions = (): JSX.Element[] => {
        return Object.keys(data).map(year => {
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
                <Title text={title} />
                <Stack />
            </Chart>
            <Select id="select" style={{ width: '100px', margin: '10px' }} onChange={onChangeYear} value={year}>
                {getOptions()}
            </Select>
        </>
    );
};

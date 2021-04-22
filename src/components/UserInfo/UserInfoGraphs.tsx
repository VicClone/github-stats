import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    Chart,
    Legend,
    PieSeries,
    Title,
    Tooltip,
    ValueAxis
} from '@devexpress/dx-react-chart-material-ui';
import { ArgumentScale, BarSeries, EventTracker } from '@devexpress/dx-react-chart';
import { scaleBand } from '@devexpress/dx-chart-core';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Label } from '../Repository/Label';
import { LanguagePercents } from '../../types/appTypes';

const commitsStats = [
    {
        month: '01',
        number: 12
    },
    {
        month: '02',
        number: 10
    },
    {
        month: '03',
        number: 20
    },
    {
        month: '04',
        number: 0
    },
    {
        month: '05',
        number: 1
    },
    {
        month: '06',
        number: 12
    },
    {
        month: '07',
        number: 10
    },
    {
        month: '08',
        number: 20
    },
    {
        month: '09',
        number: 0
    },
    {
        month: '10',
        number: 1
    },
    {
        month: '11',
        number: 0
    },
    {
        month: '12',
        number: 1
    }
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '50%',
            [theme.breakpoints.down('md')]: {
                width: '100%'
            }
        },
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

const LabelValueAxis = Label(' раз');

interface PropsType {
    languagesInPercents: LanguagePercents[];
}

export const UserInfoGraphs = (props: PropsType) => {
    const classes = useStyles();

    return (
        <div className={classes.graphs}>
            <Paper className={classes.graph}>
                <Chart data={props.languagesInPercents} height={300}>
                    <ArgumentScale factory={scaleBand} />
                    <PieSeries valueField="percent" argumentField="name" outerRadius={1} />
                    <Legend />
                    <Title text="Статистика использования языков" />
                    <EventTracker />
                    <Tooltip />
                </Chart>
            </Paper>
            <Paper className={classes.graph}>
                <Chart data={commitsStats}>
                    <ArgumentScale factory={scaleBand} />
                    <ArgumentAxis />
                    <ValueAxis labelComponent={LabelValueAxis} />
                    <BarSeries valueField="number" argumentField="month" />
                    <Title text="Частота коммитов по месяцам" />
                    <EventTracker />
                    <Tooltip />
                </Chart>
            </Paper>
        </div>
    );
};

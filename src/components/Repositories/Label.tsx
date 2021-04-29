import { ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import React from 'react';

// eslint-disable-next-line react/display-name
export const Label = (symbol: any) => (props: any) => {
    const { text } = props;
    return <ValueAxis.Label {...props} text={text + symbol} />;
};

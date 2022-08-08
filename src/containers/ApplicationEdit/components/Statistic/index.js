import React from 'react';
import { Pane, GridGenerator, Cell, Chart } from 'components';
import { Typography } from '@material-ui/core';

import style from './style.scss';

const Statistic = ({ data = {}, t, style }) => {
    console.log(data);
    const { maxTranslates, countTranslates } = data;
    return (
        <Pane style={style} title={t('application.statistic_block')}>
            <Chart
                percent={(countTranslates / maxTranslates) * 100}
                max={t(
                    'application.chart_diff',
                    { max: maxTranslates },
                    'from ${max}',
                )}
                count={countTranslates}
            >
                {t('application.translation_exist_statistic')}
            </Chart>
        </Pane>
    );
};

export default Statistic;

import React from 'react';
import { Pane, GridGenerator, Cell, Chart } from 'components';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import style from './style.scss';

const colorArray = [
    '#FF6633',
    '#FFB399',
    '#FF33FF',
    '#FFFF99',
    '#00B3E6',
    '#E6B333',
    '#3366E6',
    '#999966',
    '#99FF99',
    '#B34D4D',
    '#80B300',
    '#809900',
    '#E6B3B3',
    '#6680B3',
    '#66991A',
    '#FF99E6',
    '#CCFF1A',
    '#FF1A66',
    '#E6331A',
    '#33FFCC',
    '#66994D',
    '#B366CC',
    '#4D8000',
    '#B33300',
    '#CC80CC',
    '#66664D',
    '#991AFF',
    '#E666FF',
    '#4DB3FF',
    '#1AB399',
    '#E666B3',
    '#33991A',
    '#CC9999',
    '#B3B31A',
    '#00E680',
    '#4D8066',
    '#809980',
    '#E6FF80',
    '#1AFF33',
    '#999933',
    '#FF3380',
    '#CCCC00',
    '#66E64D',
    '#4D80CC',
    '#9900B3',
    '#E64D66',
    '#4DB380',
    '#FF4D4D',
    '#99E6E6',
    '#6666FF',
];

const Statistic = ({ data = {}, t, applicationStatistics }) => {
    const { maxTranslates, countTranslates } = data;
    const { languagesList = [], translates = {} } = applicationStatistics;
    console.log(applicationStatistics);
    return (
        <>
            <Chart
                percent={(countTranslates / maxTranslates) * 100}
                max={t(
                    'application.chart_diff',
                    { max: maxTranslates },
                    'from {{max}}',
                )}
                count={countTranslates}
            >
                {t('application.translation_exist_statistic')}
            </Chart>
            <Box className={style.languages}>
                {languagesList.map((i, index) => {
                    const max = countTranslates;
                    return (
                        <Chart
                            percent={(translates[i] / max) * 100}
                            max={t(
                                'application.chart_diff',
                                { max: max },
                                'from {{max}}',
                            )}
                            key={i}
                            color={colorArray[index]}
                            count={translates[i]}
                        >
                            {(i || '').toUpperCase()}
                        </Chart>
                    );
                })}
            </Box>
        </>
    );
};

export default Statistic;

import React from 'react';
import { Chart, UpdatePlanLink } from 'components';
import Box from '@mui/material/Box';
import { colorArray } from 'helpers/colors';
import style from './style.scss';

const Statistic = ({ data = {}, t, applicationStatistics }) => {
    const { maxTranslates, countTranslates } = data;
    const {
        languagesList = [],
        translates = {},
        total,
    } = applicationStatistics;
    console.log(applicationStatistics);
    return (
        <>
            <Chart
                percent={(countTranslates / maxTranslates) * 100}
                max={
                    <>
                        {t(
                            'application.chart_diff',
                            { max: maxTranslates },
                            'from {{max}}',
                        )}
                    </>
                }
                count={countTranslates}
            >
                <span className={style.updatePlan}>
                    {t('application.translation_exist_statistic')}
                    {/* <UpdatePlanLink t={t} /> */}
                </span>
            </Chart>
            <Box className={style.languages}>
                {languagesList.map((i, index) => {
                    const max = total;
                    console.log(translates[i] / max);
                    return (
                        <Chart
                            percent={(translates[i] / max) * 100}
                            max={''}
                            key={i}
                            color={colorArray[index]}
                            count={
                                `${(translates[i] / max) * 100}`.slice(0, 4) +
                                '%'
                            }
                        >
                            {t(
                                'application.percent_full',
                                {
                                    lang_code: (i || '').toUpperCase(),
                                },
                                '{{lang_code}} full',
                            )}
                        </Chart>
                    );
                })}
            </Box>
        </>
    );
};

export default Statistic;

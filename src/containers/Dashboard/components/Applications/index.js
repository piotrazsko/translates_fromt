import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Pane } from 'components';

import {
    getApplicationsStatisticsRequest,
    getApplicationsStatisticsSelector,
} from 'modules/statistics';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { colorArray } from 'helpers/colors';

import style from './style.scss';

const Applications = ({ style, history }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const applications = useSelector(getApplicationsStatisticsSelector);
    console.log(applications);

    React.useEffect(() => {
        dispatch(getApplicationsStatisticsRequest());
    }, []);

    const { preparedData, languages, ids } = React.useMemo(() => {
        const languages = new Set();
        if (applications.loaded) {
            return {
                preparedData: applications.map((i) => {
                    const langs = Object.keys(i.languages).reduce(
                        (acc, item) => {
                            languages.add(item);
                            acc[item] = (i.languages[item] / i.total) * 100;
                            return acc;
                        },
                        {},
                    );

                    return { name: i.name, ...langs };
                }),
                languages: Array.from(languages),
                ids: applications.map((i) => i.id),
            };
        }
        return { languages: [] };
    }, [applications]);

    return (
        <Pane
            style={style}
            title={t('dashboard.application')}
            menuItems={[
                {
                    title: t('dashboard.go_to_application'),
                    onClick: () => {
                        history.push('/applications');
                    },
                },
            ]}
        >
            <ResponsiveContainer width="90%" height={250}>
                <BarChart
                    onClick={(ev, data) => {
                        if (ev?.activeTooltipIndex) {
                            history.push(
                                `/applications/${ids[ev.activeTooltipIndex]}`,
                            );
                        }
                    }}
                    width={500}
                    height={300}
                    data={preparedData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis unit="%" />
                    <Tooltip />
                    <Legend />
                    {languages.map((i, index) => (
                        <Bar
                            dataKey={i}
                            key={i}
                            fill={colorArray[index] || '#FF6633'}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </Pane>
    );
};

export default Applications;

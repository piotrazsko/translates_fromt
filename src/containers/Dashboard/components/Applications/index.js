import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Pane } from 'components';

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

const Applications = ({ style, history, applications = [] }) => {
    const { t } = useTranslation();

    const { preparedData, languages, ids } = React.useMemo(() => {
        const languages = new Set();
        if (applications.loaded) {
            return {
                preparedData: applications.map((i) => {
                    const langs = Object.keys(i.languages).reduce(
                        (acc, item) => {
                            languages.add(item);
                            acc[item] = Math.round(
                                (i.languages[item] / i.total) * 100,
                            );
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
            <ResponsiveContainer width="100%" height={250}>
                <BarChart
                    onClick={(ev, data) => {
                        if (ev) {
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
                    <XAxis dataKey="name" name="langs" />
                    <YAxis unit="%" />
                    <Tooltip />
                    <Legend />
                    {languages.map((i, index) => (
                        <Bar
                            unit="%"
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

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Pane, PagePlaceholder } from 'components';
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
import { Tooltip as CustomTooltip } from './components/Tooltip';
import styles from './style.scss';

const defaultSelectValue = 'all';

const Applications = ({ style, history, applications = [] }) => {
    const { t } = useTranslation();
    const [application, setApplication] = React.useState(defaultSelectValue);
    const { preparedData, languages, ids } = React.useMemo(() => {
        const languages = new Set();
        if (applications.loaded) {
            return {
                preparedData: applications
                    .filter((i) =>
                        application !== defaultSelectValue && application
                            ? application === i.id
                            : true,
                    )
                    .map((i) => {
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
                ids: applications
                    // .filter((i) => (application ? application === i.id : true))
                    .map((i) => i.id),
            };
        }
        return { languages: [] };
    }, [applications, application]);
    console.log(ids);

    return (
        <Pane
            style={style}
            title={t('dashboard.application')}
            headerButt
            action={
                <Button
                    variant="contained"
                    onClick={() => {
                        history.push('/applications');
                    }}
                    classes={{ root: styles.button }}
                >
                    {t('dashboard.add_application')}
                </Button>
            }
        >
            <Box>
                <Select
                    className={styles.select}
                    value={application}
                    onChange={(ev, value) => {
                        setApplication(ev.target.value);
                    }}
                    defaultValue={'all'}
                    autoWidth
                    variant="filled"
                >
                    <MenuItem value={defaultSelectValue}>
                        {t('dashboard.all_items_select')}
                    </MenuItem>
                    {applications.loaded
                        ? applications.map((i, index) => (
                              <MenuItem value={i.id}>{i.name}</MenuItem>
                          ))
                        : null}
                </Select>
            </Box>
            {applications.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                        onClick={(ev, data) => {
                            if (ev) {
                                history.push(
                                    `/applications/${
                                        ids[ev.activeTooltipIndex]
                                    }`,
                                );
                            }
                        }}
                        width={1700}
                        height={400}
                        data={preparedData}
                        margin={{
                            top: 0,
                            right: 30,
                            left: 0,
                            bottom: 5,
                        }}
                        maxBarSize={200}
                    >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="name" name="langs" />
                        <YAxis unit="% " />
                        <Tooltip
                            isAnimationActive={false}
                            wrapperStyle={{ maxHeight: 150 }}
                        />
                        <Legend
                            iconSize={8}
                            chartWidth={10}
                            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                        />
                        {languages.map((i, index) => (
                            <Bar
                                layout="vertical"
                                unit="%"
                                dataKey={i}
                                key={i}
                                fill={colorArray[index] || '#FF6633'}
                                maxBarSize={15}
                                // legendType='none'
                                // barSize={6}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <PagePlaceholder>
                    {t('dashboard.no_applications')}
                </PagePlaceholder>
            )}
        </Pane>
    );
};

export default Applications;

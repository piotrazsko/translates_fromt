import React from 'react';
import { Typography } from '@mui/material';
import ReactChart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { Pane } from 'components';

import styles from './style.scss';

export const Chart = ({
    title,
    color = '#F29509',
    viewPort,
    style,
    count = 0,
    maxCount = 0,
}) => {
    const { t } = useTranslation();
    const percent = (count / maxCount) * 100;

    const { isDesktop, isTablet } = viewPort;

    const options = {
        plotOptions: {
            radialBar: {
                startAngle: -180,
                endAngle: 180,
                hollow: {
                    margin: 0,
                    size: '70%',
                    background: '#fff',
                    image: undefined,
                    imageOffsetX: 0,
                    imageOffsetY: 0,
                    color: 'red',
                    // position: 'front',
                    dropShadow: {
                        enabled: false,
                        top: 3,
                        left: 0,
                        blur: 4,
                        opacity: 0.24,
                    },
                },
                track: {
                    background: '#f5f5f5',
                    // strokeWidth: '67%',
                    margin: 0, // margin is in pixels
                    dropShadow: {
                        enabled: false,
                        top: -3,
                        left: 0,
                        blur: 4,
                        opacity: 0.35,
                    },
                },
                dataLabels: {
                    show: true,
                    name: {
                        offsetY: -10,
                        show: false,
                        color: '#888',
                        fontSize: '16px',
                    },
                    value: {
                        formatter: function (val) {
                            return `${parseInt(val)}%`;
                        },
                        offsetY: 12,
                        color: color,
                        fontSize: !isTablet ? '32px' : '24px',
                        show: true,
                    },
                },
            },
        },
        fill: {
            colors: [color],
        },

        stroke: {
            lineCap: 'round',
        },
        labels: ['Percent'],
    };
    const series = [parseInt(percent)];

    const ref = React.useRef();
    const { height, width } = React.useMemo(() => {
        if (ref.current) {
            const width = ref.current.getBoundingClientRect().width;
            const height = ref.current.getBoundingClientRect().height;
            return {
                width: width > 300 ? 300 : width < 250 ? 200 : width,
                heigh: height > 300 ? 300 : height < 250 ? 200 : height,
            };
        } else {
            return { height: 280, width: 250 };
        }
    }, [ref.current, viewPort.width]);

    return (
        <Pane
            showHeader={false}
            classes={{ content: styles.content, header: styles.header }}
            style={style}
        >
            <Typography className={styles.title} variant="body2">
                {title}
            </Typography>
            <div className={styles.chartContainer} ref={ref}>
                <ReactChart
                    options={options}
                    series={series}
                    type="radialBar"
                    height={height}
                    width={width}
                />
            </div>
            <div className={styles.bottomText}>
                {t('chart.count_from', { count: count })}
                <span style={{ color: color }}> {maxCount}</span>
            </div>
        </Pane>
    );
};

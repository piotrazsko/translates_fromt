import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import Typography from '@mui/material/Typography';

const Chart = ({ percent = 10, color, max, count, children }) => {
    return (
        <div className={style.container}>
            <Typography className={style.title}>{children}</Typography>

            <div className={style.chartContainer}>
                <div
                    className={style.chart}
                    style={{
                        width: `${percent}%`,
                        ...(color ? { backgroundColor: color } : {}),
                    }}
                ></div>
            </div>
            <div className={style.countContainer}>
                <span className={style.count}>{count}</span>
                <span
                    className={style.max}
                    style={{
                        ...(color ? { color: color } : {}),
                    }}
                >
                    {' '}
                    / {max}
                </span>
            </div>
        </div>
    );
};

Chart.propTypes = {
    percent: PropTypes.number.isRequired,
};

export default Chart;

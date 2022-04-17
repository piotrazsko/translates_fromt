import React from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import style from './style.scss';

const Pane = ({ children, title = '' }) => {
    return (
        <Card>
            <CardContent>
                {title ? (
                    <Typography
                        className={style.title}
                        gutterBottom
                        variant="h2"
                        component="div"
                    >
                        {title}
                    </Typography>
                ) : null}
                {children}
            </CardContent>
        </Card>
    );
};

Pane.propTypes = {
    cildren: PropTypes.any,
    title: PropTypes.string,
};

export default Pane;

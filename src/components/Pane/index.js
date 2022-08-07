import React from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

import styles from './style.scss';

const Pane = ({ children, title = '', className, style = {} }) => {
    return (
        <Card className={className} style={style}>
            <CardHeader
                title={title}
                titleTypographyProps={{
                    variant: 'h2',
                    gutterBottom: true,
                    className: styles.title,
                }}
            />
            <CardContent>{children}</CardContent>
        </Card>
    );
};

Pane.propTypes = {
    cildren: PropTypes.any,
    title: PropTypes.string,
};

export default Pane;

import { Box, Typography } from '@mui/material';
import React from 'react';
import style from './style.scss';

const PagePlaceholder = ({ children, ...props }) => {
    return (
        <Box className={style.box}>
            <Typography variant="subtitle1" {...props}>
                {children}
            </Typography>
        </Box>
    );
};

export default PagePlaceholder;

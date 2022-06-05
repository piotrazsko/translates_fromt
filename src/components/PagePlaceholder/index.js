import { Typography } from '@mui/material';
import React from 'react';

const PagePlaceholder = ({ children, ...props }) => {
    return (
        <Typography variant="subtitle1" {...props}>
            {children}
        </Typography>
    );
};

export default PagePlaceholder;

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import style from './style.scss';

const Skeleton = ({ title, subtitle, children }) => {
    return (
        <Box className={style.container}>
            <Box>
                <Typography varian="h3" className={style.title}>
                    {title}
                </Typography>
            </Box>
            <Box>
                <Typography variant="body2" className={style.subtitle}>
                    {subtitle}
                </Typography>
            </Box>
            <Box>{children}</Box>
        </Box>
    );
};

export default Skeleton;

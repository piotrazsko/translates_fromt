import React from 'react';
import Typography from '@mui/material/Typography';

import style from './style.scss';

const Placeholder = ({ children }) => {
    return (
        <div className={style.container}>
            <Typography h4 className={style.text}>
                {children}
            </Typography>
        </div>
    );
};

export default Placeholder;

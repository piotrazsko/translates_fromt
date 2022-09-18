import React from 'react';

import Box from '@mui/material/Box';

import style from './style.scss';

const Flag = ({ src, className, code }) => {
    return src ? (
        <img
            className={[style.flag, className].join(' ')}
            src={src}
            alt={code}
        />
    ) : (
        <Box className={style.flag} />
    );
};

export default Flag;

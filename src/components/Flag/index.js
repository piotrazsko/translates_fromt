import React from 'react';

import Box from '@mui/material/Box';
import * as flags from 'assets/images/flags';

import style from './style.scss';

const Flag = ({ className, code }) => {
    return flags[code] ? (
        <img
            className={[style.flag, className].join(' ')}
            src={flags[code]?.default}
            alt={code}
        />
    ) : (
        <Box className={style.flag} />
    );
};

export default Flag;

import React from 'react';
import Box from '@mui/material/Box';
import { LogoFull } from 'assets/images/icons';

import style from './style.scss';

const Header = () => {
    return (
        <Box className={style.headerContainer}>
            <LogoFull className={style.logo} />
        </Box>
    );
};

export default Header;

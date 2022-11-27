import React from 'react';
import Box from '@mui/material/Box';
import { LogoFull } from 'assets/images/icons';
import { Link } from 'react-router-dom';

import style from './style.scss';

const Header = () => {
    return (
        <Box className={style.headerContainer} component={Link} to="/">
            <LogoFull className={style.logo} />
        </Box>
    );
};

export default Header;

import React from 'react';
import { Link as LinkRD } from 'react-router-dom';
import LinkMui from '@mui/material/Link';

import style from './style.scss';

export const Link = ({ ...props }) => {
    return <LinkMui className={style.link} component={LinkRD} {...props} />;
};

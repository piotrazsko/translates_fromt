import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import { CopyIcon } from 'assets/images/icons';
import style from './style.scss';

export const CopyToClipBoardButton = ({ onClick }) => {
    return (
        <InputAdornment position="end" classes={{ root: style.iconContainer }}>
            <IconButton
                onClick={() => onClick()}
                className={style.button}
                size="small"
            >
                <CopyIcon height={'14'} />
            </IconButton>
        </InputAdornment>
    );
};

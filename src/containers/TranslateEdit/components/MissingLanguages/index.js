import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ErrorIcon, SuccessIcon } from 'assets/images/icons';
import style from './style.scss';

const MissingLanguages = ({ t, missingLanguages }) => {
    return (
        <Box className={style.container}>
            {missingLanguages.length > 0 ? (
                <ErrorIcon height={14} />
            ) : (
                <SuccessIcon height={14} />
            )}
            <Typography className={style.label}>
                {t('translation.missing_translates')}:
            </Typography>
            <Typography className={style.items}>
                {missingLanguages.length > 0
                    ? missingLanguages.join(', ')
                    : t('translation.all_translated')}
            </Typography>
        </Box>
    );
};

export default MissingLanguages;

import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import style from './style.scss';

const FormPageSkeleton = ({ onSave, onCancel, children }) => {
    const { t } = useTranslation();
    return (
        <>
            <Box className={style.container}>{children}</Box>
            <Grid className={style.buttonsContainer} container spacing={2}>
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            onCancel();
                        }}
                    >
                        {t('button.cancel')}
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onSave()}
                    >
                        {t('button.save')}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default FormPageSkeleton;

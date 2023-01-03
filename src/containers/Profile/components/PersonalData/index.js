import React from 'react';
import { Avatar, Box, TextField, Button } from '@mui/material';
import style from './style.scss';

export const PersonalData = ({
    t,
    values,
    handleChange,
    errors,
    touched,
    onChangePasswordClick,
}) => {
    console.log(values);
    return (
        <Box className={style.container}>
            <Avatar className={style.avatar} />

            <TextField
                margin="normal"
                variant="filled"
                fullWidth
                label={t('profile.first_name_input')}
                value={values.firstName}
                onChange={handleChange('firstName')}
            />
            <TextField
                margin="normal"
                variant="filled"
                fullWidth
                label={t('profile.last_name_input')}
                value={values.lastName}
                onChange={handleChange('lastName')}
            />
            <TextField
                margin="normal"
                variant="filled"
                fullWidth
                label={t('profile.email_input')}
                value={values.email}
                disabled
                onChange={handleChange('email')}
            />
            <Box className={style.buttonContainer}>
                <Button onClick={onChangePasswordClick}>
                    {t('profile.change_password_button')}
                </Button>
            </Box>
        </Box>
    );
};

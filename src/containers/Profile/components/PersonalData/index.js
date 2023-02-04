import React from 'react';
import { Avatar, Box, TextField, Button } from '@mui/material';
import { stringAvatar } from 'helpers/avatar';
import style from './style.scss';

export const PersonalData = ({
    t,
    values,
    handleChange,
    errors,
    onChangePasswordClick,
}) => {
    return (
        <Box className={style.container}>
            <Avatar
                className={style.avatar}
                {...stringAvatar(
                    `${values.firstName || ''} ${values.lastName || ''}`,
                )}
            ></Avatar>

            <TextField
                margin="normal"
                variant="filled"
                fullWidth
                label={t('profile.first_name_input')}
                value={values.firstName}
                onChange={handleChange('firstName')}
                helperText={errors.firstName}
                error={errors.firstName}
            />
            <TextField
                margin="normal"
                variant="filled"
                fullWidth
                label={t('profile.last_name_input')}
                value={values.lastName}
                onChange={handleChange('lastName')}
                helperText={errors.lastName}
                error={errors.lastName}
            />
            <TextField
                margin="normal"
                variant="filled"
                fullWidth
                label={t('profile.email_input')}
                value={values.email}
                disabled
                onChange={handleChange('email')}
                helperText={errors.email}
                error={errors.email}
            />
            <Box className={style.buttonContainer}>
                <Button onClick={onChangePasswordClick}>
                    {t('profile.change_password_button')}
                </Button>
            </Box>
        </Box>
    );
};

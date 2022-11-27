import * as React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { resetPasswordRequest } from 'modules/auth';
import Skeleton from '../components/Skeleton';

import style from './style.scss';

const validationSchema = (t) =>
    yup.object({
        email: yup
            .string()
            .email()
            .required(
                t('error.field_required', { name: t('sign_up.email_label') }),
            ),
    });

const ResetPassword = ({ history }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { handleChange, values, handleSubmit, errors } = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema(t),
        onSubmit: (values) => {
            dispatch(
                resetPasswordRequest(values, {
                    onSuccess: () => {
                        history.goBack();
                    },
                }),
            );
        },
    });

    return (
        <Skeleton
            title={t('reset_password.title')}
            subtitle={<>{t('reset_password.subtitle')} </>}
            classes={{ subtitle: style.subtitle, container: style.container }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
            >
                <TextField
                    margin="dense"
                    required
                    variant="filled"
                    fullWidth
                    id="email"
                    label={t('reset_password.email_input')}
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange('email')}
                    autoFocus
                    helperText={errors.email}
                    error={errors.email}
                />
                <Grid container spacing={2} className={style.buttonContainer}>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            sx={{ mt: 1, mb: 1 }}
                            onClick={() => {
                                history.goBack();
                            }}
                        >
                            {t('reset_password.cancel_button')}
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 1, mb: 1 }}
                        >
                            {t('reset_password.submit_button')}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Skeleton>
    );
};

export default ResetPassword;

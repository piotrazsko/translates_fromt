import * as React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { changePasswordRequest } from 'modules/auth';
import Skeleton from '../components/Skeleton';

import style from './style.scss';

const validationSchema = (t) =>
    yup.object({
        password: yup
            .string()
            .min(6)
            .max(16)
            .required(t('error.field_reqiured')),
        old_password: yup
            .string()
            .min(6)
            .max(16)
            .required(t('error.field_reqiured')),
        confirmed_password: yup
            .string()
            .min(6)
            .max(16)
            .required(t('error.field_reqiured'))
            .oneOf(
                [yup.ref('password'), null],
                t('error.passwords_must_mutch'),
            ),
    });

const ChangePassword = ({ history }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { handleChange, values, handleSubmit, handleBlur, errors, touched } =
        useFormik({
            initialValues: {
                password: '',
                confirmed_password: '',
                old_password: '',
            },
            validationSchema: validationSchema(t),
            onSubmit: (values) => {
                dispatch(
                    changePasswordRequest(values, {
                        onSuccess: () => {
                            history.goBack();
                        },
                    }),
                );
            },
        });

    return (
        <Skeleton
            title={t('change_password.title')}
            subtitle={<>{t('change_password.subtitle')} </>}
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
                    id="old_password"
                    label={t('change_password.old_password')}
                    name="old_password"
                    autoComplete="old_password"
                    value={values.old_password}
                    onChange={handleChange('old_password')}
                    autoFocus
                    helperText={touched.old_password ? errors.old_password : ''}
                    type="password"
                    error={errors.old_password && touched.old_password}
                    onBlur={handleBlur('old_password')}
                />
                <TextField
                    margin="dense"
                    required
                    variant="filled"
                    fullWidth
                    id="password"
                    label={t('change_password.password')}
                    name="password"
                    autoComplete="password"
                    value={values.password}
                    onChange={handleChange('password')}
                    helperText={touched.password ? errors.password : ''}
                    error={touched.password && errors.password}
                    type="password"
                    onBlur={handleBlur('password')}
                />
                <TextField
                    margin="dense"
                    required
                    variant="filled"
                    fullWidth
                    id="confirmed_password"
                    label={t('change_password.confirmed_password')}
                    name="confirmed_password"
                    autoComplete="confirmed_password"
                    value={values.confirmed_password}
                    onChange={handleChange('confirmed_password')}
                    helperText={
                        touched.confirmed_password
                            ? errors.confirmed_password
                            : ''
                    }
                    type="password"
                    onBlur={handleBlur('confirmed_password')}
                    error={
                        touched.confirmed_password && errors.confirmed_password
                    }
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
                            {t('change_password.cancel_button')}
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
                            {t('change_password.submit_button')}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Skeleton>
    );
};

export default ChangePassword;

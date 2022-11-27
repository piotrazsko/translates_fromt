import * as React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import * as yup from 'yup';
import get from 'lodash/get';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { loginRequest } from 'modules/auth';

import { Checkbox, Link } from 'components';

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
        password: yup
            .string()
            .min(6)
            .max(16)
            .required(
                t('error.field_required', {
                    name: t('sign_up.password_label'),
                }),
            ),
    });

const Auth = ({ history }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { handleChange, values, handleSubmit, setErrors, errors } = useFormik(
        {
            initialValues: {
                email: '',
                password: '',
            },
            validationSchema: validationSchema(t),
            onSubmit: (values) => {
                dispatch(
                    loginRequest(
                        { ...values },
                        {
                            onSuccess: () => {
                                history.push('/');
                            },
                            onFailure: (data) => {
                                setErrors({
                                    ...errors,
                                    ...get(data, 'response.data.error'),
                                });
                            },
                        },
                    ),
                );
            },
        },
    );

    return (
        <Skeleton
            title={t('auth.title')}
            subtitle={
                <>
                    {t('auth.subtitle')}{' '}
                    <Link className={style.sign_up} to={'/register'}>
                        {t('auth.sign_up')}
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit}>
                <TextField
                    margin="dense"
                    required
                    variant="filled"
                    fullWidth
                    id="email"
                    label={t('auth.email_input')}
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange('email')}
                    autoFocus
                    helperText={errors.email}
                    error={errors.email}
                />
                <TextField
                    required
                    variant="filled"
                    fullWidth
                    name="password"
                    label={t('auth.password_input')}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange('password')}
                    helperText={errors.password}
                    error={errors.password}
                    margin="dense"
                />
                <Checkbox
                    value="remember"
                    className={style.checkbox}
                    color="primary"
                    label={t('auth.remember_me')}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1, mb: 1 }}
                >
                    {t('auth.sign_in_button')}
                </Button>
                <Box className={style.forgot_password_container}>
                    <Link
                        className={style.forgot_password}
                        to="/restore-password"
                    >
                        {t('auth.forgot_password')}
                    </Link>
                </Box>
            </form>
        </Skeleton>
    );
};

export default Auth;

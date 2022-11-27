import * as React from 'react';
import { useFormik } from 'formik';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { Checkbox, Link } from 'components';
import { registerRequest } from 'modules/auth';
import Skeleton from '../components/Skeleton';

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
        confirm_password: yup
            .string()
            .min(6)
            .max(16)
            .required(
                t('error.field_required', {
                    name: t('sign_up.confirm_password_label'),
                }),
            )
            .oneOf([yup.ref('password'), null], 'Passwords must match'),

        first_name: yup
            .string()
            .min(2)
            .required(
                t('error.field_required', {
                    name: t('sign_up.first_name_label'),
                }),
            ),
        last_name: yup
            .string()
            .min(2)
            .required(
                t('error.field_required', {
                    name: t('sign_up.last_name_label'),
                }),
            ),
    });

const SignUp = ({ history }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const {
        handleChange,
        handleBlur,
        touched,
        values,
        handleSubmit,
        errors,
        setFieldValue,
        setErrors,
    } = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm_password: '',
            first_name: '',
            last_name: '',
            confirmation: false,
        },
        validationSchema: validationSchema(t),
        onSubmit: ({ confirmation, ...values }) => {
            dispatch(
                registerRequest(values, {
                    onSuccess: () => {
                        history.push('/');
                    },
                    onFailure: (data) => {
                        setErrors({
                            ...errors,
                            ...get(data, 'response.data.error'),
                        });
                    },
                }),
            );
        },
    });

    return (
        <Skeleton
            title={t('sign_up.title')}
            subtitle={
                <>
                    {t('sign_up.subtitle_text')}{' '}
                    {<Link to="/login">{t('sign_up.login_link')}</Link>}
                </>
            }
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
                    id="first_name"
                    label={t('sign_up.first_name_label')}
                    name="first_name"
                    autoComplete="first_name"
                    value={values.first_name}
                    onChange={handleChange('first_name')}
                    onBlur={handleBlur('first_name')}
                    autoFocus
                    helperText={touched.first_name ? errors.first_name : null}
                    error={touched.first_name && Boolean(errors.first_name)}
                />
                <TextField
                    margin="dense"
                    required
                    variant="filled"
                    fullWidth
                    id="first_name"
                    label={t('sign_up.last_name_label')}
                    name="last_name"
                    autoComplete="last_name"
                    value={values.last_name}
                    onChange={handleChange('last_name')}
                    onBlur={handleBlur('last_name')}
                    helperText={touched.last_name ? errors.last_name : null}
                    error={touched.last_name && Boolean(errors.last_name)}
                />
                <TextField
                    margin="dense"
                    required
                    variant="filled"
                    fullWidth
                    id="email"
                    label={t('sign_up.email_label')}
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    helperText={touched.email ? errors.email : null}
                    error={touched.email && Boolean(errors.email)}
                />
                <TextField
                    margin="dense"
                    required
                    variant="filled"
                    fullWidth
                    name="password"
                    label={t('sign_up.password_label')}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    helperText={touched.password ? errors.password : null}
                    error={touched.password && Boolean(errors.password)}
                />
                <TextField
                    margin="dense"
                    required
                    variant="filled"
                    fullWidth
                    name="password"
                    label={t('sign_up.confirm_password_label')}
                    type="password"
                    id="confirm_password"
                    autoComplete="current-password"
                    value={values.confirm_password}
                    onChange={handleChange('confirm_password')}
                    onBlur={handleBlur('confirm_password')}
                    helperText={
                        touched.confirm_password
                            ? errors.confirm_password
                            : null
                    }
                    error={
                        touched.confirm_password &&
                        Boolean(errors.confirm_password)
                    }
                />
                <Checkbox
                    name="confirmation"
                    value="remember"
                    color="primary"
                    label={t('sign_up.confitm_rule')}
                    checked={values.confirmation}
                    onChange={() =>
                        setFieldValue('confirmation', !values.confirmation)
                    }
                />

                <Button
                    disabled={!values.confirmation}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1, mb: 1 }}
                >
                    {t('sign_up.confirm_button')}
                </Button>
            </Box>
        </Skeleton>
    );
};

export default SignUp;

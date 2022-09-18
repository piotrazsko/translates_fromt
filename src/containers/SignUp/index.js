import * as React from 'react';
import { useFormik } from 'formik';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { registerRequest } from 'modules/auth';

const validationSchema = yup.object({
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .min(6)
        .max(16)
        .required(),
    confirm_password: yup
        .string()
        .min(6)
        .max(16)
        .required()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),

    first_name: yup
        .string()
        .min(2)
        .required(),
    last_name: yup
        .string()
        .min(2)
        .required(),
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
        validationSchema: validationSchema,
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
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    {t('title.signup')}
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        variant="outlined"
                        fullWidth
                        id="first_name"
                        label={t('input.first_name')}
                        name="first_name"
                        autoComplete="first_name"
                        value={values.first_name}
                        onChange={handleChange('first_name')}
                        onBlur={handleBlur('first_name')}
                        autoFocus
                        helperText={
                            touched.first_name ? errors.first_name : null
                        }
                        error={touched.first_name && Boolean(errors.first_name)}
                    />
                    <TextField
                        margin="normal"
                        required
                        variant="outlined"
                        fullWidth
                        id="first_name"
                        label={t('input.last_name')}
                        name="last_name"
                        autoComplete="last_name"
                        value={values.last_name}
                        onChange={handleChange('last_name')}
                        onBlur={handleBlur('last_name')}
                        helperText={touched.last_name ? errors.last_name : null}
                        error={touched.last_name && Boolean(errors.last_name)}
                    />

                    <TextField
                        margin="normal"
                        required
                        variant="outlined"
                        fullWidth
                        id="email"
                        label={t('input.email')}
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange('email')}
                        onBlur={handleBlur('email')}
                        helperText={touched.email ? errors.email : null}
                        error={touched.email && Boolean(errors.email)}
                    />
                    <TextField
                        margin="normal"
                        required
                        variant="outlined"
                        fullWidth
                        name="password"
                        label={t('input.password')}
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
                        margin="normal"
                        required
                        variant="outlined"
                        fullWidth
                        name="password"
                        label={t('input.confirm_password')}
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

                    <FormControlLabel
                        checked={values.confirmation}
                        onChange={() =>
                            setFieldValue('confirmation', !values.confirmation)
                        }
                        control={
                            <Checkbox
                                name="confirmation"
                                value="remember"
                                color="primary"
                            />
                        }
                        label={t('input.confitm_rule')}
                    />
                    <Button
                        disabled={!values.confirmation}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {t('button.signup')}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/* <Button
                                variant="text"
                                color="primary"
                                onClick={() => {
                                    history.push('/reset-password');
                                }}
                            >
                                Forgot password?
                            </Button> */}
                        </Grid>
                        <Grid item>
                            {/* <Button
                                variant="text"
                                color="primary"
                                onClick={() => {
                                    history.push('/register');
                                }}
                            >
                                {"Don't have an account? Sign Up"}
                            </Button> */}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUp;

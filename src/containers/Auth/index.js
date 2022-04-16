import * as React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import get from 'lodash/get';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { loginRequest, resetPasswordRequest } from 'modules/auth';
import { Popup } from 'components';
import style from './style.scss';
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
});
const validationSchemaEmail = yup.object({
    email: yup
        .string()
        .email()
        .required(),
});

const Auth = ({ history }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [emailForReset, setResetForEmail] = React.useState('');

    const {
        handleChange,
        handleBlur,
        handleReset,
        touched,
        values,
        handleSubmit,
        setErrors,
        errors,
    } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(
                loginRequest(values, {
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
    const [showPopup, setShowPopup] = React.useState(false);
    const [errorEmail, setErrorEmail] = React.useState(false);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {showPopup ? (
                <Popup
                    shwoPopup={showPopup}
                    title={t('title.reset_password')}
                    confirmButtonProps={{
                        color: 'secondary',
                    }}
                    classes={{
                        buttonContainer: style.buttonContainer,
                    }}
                    submitButtonText={t('button.send')}
                    cancelButtonText={t('button.cancel')}
                    onSubmit={(ev) => {
                        console.log(emailForReset);
                        validationSchemaEmail
                            .isValid({ email: emailForReset })
                            .then((valid) => {
                                if (!valid) {
                                    setErrorEmail('test');
                                } else {
                                    dispatch(
                                        resetPasswordRequest(
                                            {
                                                email: emailForReset,
                                            },
                                            {
                                                onSuccess: () => {
                                                    setShowPopup(!showPopup);
                                                },
                                            },
                                        ),
                                    );
                                    setErrorEmail('');
                                }
                            });
                    }}
                    onCancel={(ev) => {
                        setShowPopup(!showPopup);
                    }}
                >
                    <TextField
                        value={emailForReset}
                        onChange={(ev) => {
                            setResetForEmail(ev.target.value);
                        }}
                        fullWidth
                        helperText={errorEmail}
                        error={errorEmail}
                    />
                </Popup>
            ) : null}

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
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
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange('email')}
                        autoFocus
                        helperText={errors.email}
                        error={errors.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        variant="outlined"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={values.password}
                        onChange={handleChange('password')}
                        helperText={errors.password}
                        error={errors.password}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label={t('input.remember_me')}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {t('button.sign_in')}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Button
                                variant="text"
                                color="primary"
                                onClick={() => {
                                    setShowPopup(!showPopup);
                                }}
                            >
                                {t('button.forgot_password')}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="text"
                                color="primary"
                                onClick={() => {
                                    history.push('/register');
                                }}
                            >
                                {t(
                                    'button.sign_up_extended',
                                    "Don't have an account? Sign Up",
                                )}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Auth;

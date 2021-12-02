import * as React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import get from 'lodash/get';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import { loginRequest } from 'modules/auth';
import { Popup } from 'components_lib';
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

const Auth = ({ history }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [resetForEmail, setResetForEmail] = React.useState('');

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
                        setShowPopup(!showPopup);
                    }}
                    onCancel={(ev) => {
                        console.log('cancel');
                    }}
                >
                    <TextField
                        value={resetForEmail}
                        onChange={(ev) => {
                            setResetForEmail(ev.target.value);
                        }}
                        fullWidth
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

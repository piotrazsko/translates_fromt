import * as React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
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
    const {
        handleChange,
        handleBlur,
        handleReset,
        touched,
        values,
        handleSubmit,
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
                }),
            );
            console.log(values);
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
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Button
                                variant="text"
                                color="primary"
                                onClick={() => {
                                    history.push('/reset-password');
                                }}
                            >
                                Forgot password?
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
                                {"Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Auth;

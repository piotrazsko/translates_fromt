import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useFormik } from 'formik';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';

import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Popup } from 'components';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { Pane } from 'components';
import { showError, showWarning } from 'modules/notification';
import { changePasswordRequest } from 'modules/auth';
import style from './style.scss';

const validationSchema = yup.object({
    password: yup
        .string()
        .min(6)
        .max(16)
        .required(),
    confirmed_password: yup
        .string()
        .min(6)
        .max(16)
        .required()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    old_password: yup
        .string()
        .min(6)
        .max(16)
        .required(),
});

const Account = ({ ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = React.useState(false);
    const [showPassword, switchShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        switchShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const {
        handleChange,
        touched,
        values,
        handleSubmit,
        setErrors,
        errors,
    } = useFormik({
        initialValues: {
            confirmed_password: '',
            password: '',
            old_password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(
                changePasswordRequest(values, {
                    onSuccess: () => {
                        setShowPopup(!showPopup);
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
        <div>
            {showPopup ? (
                <Popup
                    shwoPopup={showPopup}
                    title={t('title.change_password')}
                    confirmButtonProps={{
                        color: 'secondary',
                    }}
                    classes={{
                        buttonContainer: style.buttonContainer,
                    }}
                    submitButtonText={t('button.send')}
                    cancelButtonText={t('button.cancel')}
                    onSubmit={handleSubmit}
                    onCancel={(ev) => {
                        setShowPopup(!showPopup);
                    }}
                >
                    <Container maxWidth={'xs'} fixed>
                        <TextField
                            value={values.old_password}
                            onChange={handleChange('old_password')}
                            fullWidth
                            label={t('input.old_password')}
                            helperText={
                                touched.old_password
                                    ? errors.old_password
                                    : null
                            }
                            error={
                                touched.old_password &&
                                Boolean(errors.old_password)
                            }
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            tabIndex="-1"
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            size="large">
                                            {showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            value={values.password}
                            label={t('input.password')}
                            onChange={handleChange('password')}
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            helperText={
                                touched.password ? errors.password : null
                            }
                            error={touched.password && Boolean(errors.password)}
                        />
                        <TextField
                            value={values.confirmed_password}
                            label={t('input.confirmed_password')}
                            onChange={handleChange('confirmed_password')}
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            helperText={
                                touched.confirmed_password
                                    ? errors.confirmed_password
                                    : null
                            }
                            error={
                                touched.confirmed_password &&
                                Boolean(errors.confirmed_password)
                            }
                        />
                    </Container>
                </Popup>
            ) : null}
            <Button
                color="primary"
                variant="contained"
                onClick={() => setShowPopup(!showPopup)}
            >
                {t('button.change_password')}
            </Button>
        </div>
    );
};

Account.propTypes = {
    // : PropTypes.
};

export default Account;

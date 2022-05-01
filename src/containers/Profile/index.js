import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import makeStyles from '@mui/styles/makeStyles';
import { useTranslation } from 'react-i18next';
import { PageSkeleton, Pane } from 'components';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import ChangePassword from './components/ChangePassword';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.primary.main}`,
    },
}));

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

const Profile = ({ ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = useStyles();
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
        onSubmit: (values) => {},
    });
    return (
        <>
            <PageSkeleton title={t('title.profile')}>
                <Pane>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <Typography>{t('subtitle.reference')}</Typography>
                            <Grid container>
                                <Grid item xs={11}>
                                    a-a-a-a
                                </Grid>
                                <Grid item xs={1}>
                                    <Divider orientation="vertical" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>{t('subtitle.reference')}</Typography>
                            <Grid container spacing={6} columnSpacig={1}>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="ID"
                                        size={'small'}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <ChangePassword />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField fullWidth size={'small'} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Pane>
            </PageSkeleton>
        </>
    );
};

Profile.propTypes = {
    // : PropTypes.
};

export default Profile;

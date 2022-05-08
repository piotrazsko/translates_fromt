import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import makeStyles from '@mui/styles/makeStyles';

import { PageSkeleton, Pane, LanguageSelect } from 'components';
import { getCurrentUserSelector } from 'modules/auth';
import {
    getLanguagesListRequest,
    getLanguagesListSelector,
    saveLocaleAction,
    localeSelector,
} from 'modules/i18next';

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
    password: yup.string().min(6).max(16).required(),
    confirmed_password: yup
        .string()
        .min(6)
        .max(16)
        .required()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    old_password: yup.string().min(6).max(16).required(),
});

const Profile = ({ ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = useStyles();
    const currentUser = useSelector(getCurrentUserSelector);
    const currentLang = useSelector(localeSelector);
    React.useEffect(() => {
        dispatch(getLanguagesListRequest());
    }, []);
    const languages = useSelector(getLanguagesListSelector);
    console.log(languages);
    const { handleChange, touched, values, handleSubmit, setErrors, errors } =
        useFormik({
            initialValues: {
                email: currentUser.email,
                firstName: currentUser.first_name,
                lastName: currentUser.last_name,
                adress: currentUser.address,
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
                                    <LanguageSelect
                                        filter={(i) =>
                                            languages.includes(i.iso639_1)
                                        }
                                        value={currentLang}
                                        onChange={(ev) => {
                                            dispatch(
                                                saveLocaleAction(
                                                    ev.target.value,
                                                ),
                                            );
                                        }}
                                        label={t('labels.language')}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <Divider orientation="vertical" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>{t('subtitle.reference')}</Typography>
                            <Grid container spacing={6} columnSpacig={1}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label={t('labels.firstName')}
                                        value={values.firstName}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label={t('labels.lastName')}
                                        value={values.lastName}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="email"
                                        value={values.email}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <ChangePassword />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label={t('labels.address')}
                                        value={values.address}
                                    />
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

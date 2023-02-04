import React from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserSelector, updateUserRequest } from 'modules/auth';
import {
    getLanguagesListRequest,
    getLanguagesListSelector,
    localeSelector,
    saveLocaleAction,
} from 'modules/i18next';

const validationSchema = (t) =>
    yup.object({
        email: yup.string().email().required(t('error.field_required')),
        firstName: yup
            .string()
            .min(1)
            .max(64)
            .required(t('error.field_required')),
        lastName: yup
            .string()
            .min(1)
            .max(64)
            .required(t('error.field_required')),
    });

export const useHooks = ({ history }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserSelector);
    const currentLang = useSelector(localeSelector);

    React.useEffect(() => {
        dispatch(getLanguagesListRequest());
    }, []);

    const languages = useSelector(getLanguagesListSelector);

    const { handleChange, touched, values, handleSubmit, setErrors, errors } =
        useFormik({
            initialValues: {
                email: currentUser.email,
                firstName: currentUser.first_name,
                lastName: currentUser.last_name,
                language: currentLang || 'en',
            },
            enableReinitialize: true,
            validationSchema: validationSchema(t),
            onSubmit: ({ language, ...values }) => {
                saveLocaleAction(language);
                dispatch(updateUserRequest({ language, ...values }));
            },
        });

    const onDeleteAccount = () => {};
    const onChangePasswordClick = () => {
        history.push('/change-password');
    };
    const onCancel = () => {
        history.goBack();
    };

    return {
        handleChange,
        touched,
        values,
        handleSubmit,
        setErrors,
        errors,
        languages,
        currentLang,
        currentUser,
        t,
        onDeleteAccount,
        onCancel,
        onChangePasswordClick,
    };
};

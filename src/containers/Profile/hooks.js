import React from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserSelector } from 'modules/auth';
import {
    getLanguagesListRequest,
    getLanguagesListSelector,
    localeSelector,
    saveLocaleAction,
} from 'modules/i18next';

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
            validationSchema: validationSchema,
            onSubmit: ({ language, ...values }) => {
                console.log(values);
                saveLocaleAction(language);
            },
        });

    const onDeleteAccount = () => {};
    const onChangePasswordClick = () => {
        history.push('/change-password');
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
        onCancel: () => {
            history.goBack();
        },
        onChangePasswordClick,
    };
};

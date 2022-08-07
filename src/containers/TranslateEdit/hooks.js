import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { getDataFromUrl } from 'helpers/url';
import { showPopupAction } from 'modules/popups';
import {
    getTranslatesByKeyRequest,
    getTranslatesByKeySelector,
    setTranslatesByKeyRequest,
    deleteTranslatesByIdAndLangRequest,
    getRecommendedTranslateRequest,
    updateTranslatesByKeyRequest,
} from 'modules/translates';

import get from 'lodash/get';

const validationSchema = yup.object({
    key: yup.string().required(),
    translates: yup.array().of(
        yup.object().shape({
            language: yup.string().required(),
            value: yup.string().required(),
        }),
    ),
});

export const useHook = ({ location, history, applicationId, id, classes }) => {
    const [autoTranslate, setAutoTranslate] = React.useState(false); //  use it for disable auto translate.  maybe we can use it for switch

    const { key, namespace } = React.useMemo(() => {
        const { search } = location;
        return getDataFromUrl(search);
    }, [location]);

    const { t } = useTranslation();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (id !== 'add') {
            dispatch(
                getTranslatesByKeyRequest({
                    applicationId,
                    translateId: id,
                }),
            );
        }
    }, [id]);

    const translateData = useSelector(getTranslatesByKeySelector);
    const {
        handleChange,
        handleBlur,
        handleReset,
        touched,
        values,
        handleSubmit,
        setFieldValue,
        setErrors,
        errors,
        ...data
    } = useFormik({
        initialValues: {
            key: '',
            namespace: '',
            translates: [{ id: Math.random(), language: '', value: '' }],
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (id === 'add') {
                dispatch(
                    setTranslatesByKeyRequest(
                        { ...values, applicationId },
                        {
                            onSuccess: () => {
                                history.goBack();
                            },
                            onFailure: (data) => {
                                setErrors({
                                    ...errors,
                                    ...get(data, 'response.data.error'),
                                });
                            },
                        },
                    ),
                );
            } else {
                console.log(values);
                dispatch(
                    updateTranslatesByKeyRequest(
                        {
                            ...values,
                            applicationId,
                            translateId: id,
                        },
                        {
                            onSuccess: () => {
                                history.goBack();
                            },
                            onFailure: (data) => {
                                setErrors({
                                    ...errors,
                                    ...get(data, 'response.data.error'),
                                });
                            },
                        },
                    ),
                );
            }
        },
    });

    React.useEffect(() => {
        if (translateData.loaded && id !== 'add') {
            for (const key in translateData) {
                if (
                    Object.hasOwnProperty.call(translateData, key) &&
                    key !== 'loaded'
                ) {
                    const element = translateData[key];
                    setFieldValue(key, element);
                }
            }
        }
    }, [translateData]);

    const onAdd = React.useCallback(
        (data) => {
            setFieldValue('translates', [
                ...values.translates,
                { id: Math.random(), language: '', value: '' },
            ]);
        },
        [values.translates],
    );

    const onDelete = React.useCallback(
        (itemIndex, { key, namespace, language, value }) => {
            if (values.translates.length > 1) {
                if (value || language) {
                    dispatch(
                        showPopupAction({
                            message: t('message.delete_translate_item'),
                            title: t('message.delete_translate_item_text'),

                            onClick: () => {
                                setFieldValue('translates', [
                                    ...values.translates.filter(
                                        (i, index) => index !== itemIndex,
                                    ),
                                ]);
                                dispatch(
                                    deleteTranslatesByIdAndLangRequest(
                                        {
                                            language,
                                            applicationId,
                                            translateId: id,
                                        },
                                        {
                                            onSuccess: () => {
                                                dispatch(
                                                    getTranslatesByKeyRequest({
                                                        applicationId,
                                                        translateId: id,
                                                    }),
                                                );
                                            },
                                        },
                                    ),
                                );
                                return true;
                            },
                            onCancel: () => true,
                            showCancel: true,
                            submitButtonText: t('button.ok'),
                            cancelButtonText: t('button.cancel'),
                            confirmButtonProps: {
                                color: 'error',
                                classes: { root: classes.root },
                                style: { marginLeft: '10px' },
                            },
                            cancelButtonProps: {},
                        }),
                    );
                } else {
                    setFieldValue('translates', [
                        ...values.translates.filter(
                            (i, index) => index !== itemIndex,
                        ),
                    ]);
                }
            }
        },
        [values.translates],
    );

    const onBlur = React.useCallback(
        (ev, index) => {
            if (index > 0) {
                const currentLang = get(values, 'translates[0].language');
                const text = get(values, 'translates[0].value');
                const translateToLang = ev.target.value;
                if (currentLang && text && translateToLang && autoTranslate) {
                    dispatch(
                        getRecommendedTranslateRequest(
                            {
                                currentLang,
                                text,
                                translateToLang,
                            },
                            {
                                onSuccess: (data) => {
                                    setFieldValue(
                                        `translates[${index}].value`,
                                        get(data, 'data.translate'),
                                    );
                                    console.log(data);
                                },
                            },
                        ),
                    );
                }
            }
        },
        [values.translates],
    );
    return {
        handleSubmit,
        t,
        handleChange,
        handleBlur,
        values,
        errors,
        onBlur,
        setFieldValue,
        onDelete,
        key,
        namespace,
        onAdd,
    };
};
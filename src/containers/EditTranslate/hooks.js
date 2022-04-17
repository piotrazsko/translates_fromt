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
    deleteTranslatesByKeyAndLangRequest,
    getRecommendedTranslateRequest,
    getTranslatedListSelector,
    getTranslatedListRequest,
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

export const useHook = ({ location, history, id, classes }) => {
    const { key, namespace } = React.useMemo(() => {
        const { search } = location;
        return getDataFromUrl(search);
    }, [location]);

    const { t } = useTranslation();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getTranslatedListRequest({}));
    }, []);

    React.useEffect(() => {
        if (key) {
            dispatch(
                getTranslatesByKeyRequest({
                    key: key,
                    namespace: namespace,
                }),
            );
        }
    }, [key, namespace]);

    const translateData = useSelector(getTranslatesByKeySelector);
    const fullTranslates = useSelector(getTranslatedListSelector);

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
            dispatch(
                setTranslatesByKeyRequest(
                    { ...values },
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
            // alert(JSON.stringify(values, null, 2));
        },
    });

    // React.useEffect(() => {
    //     if (id === 'add') {
    //         const { key, namespace } = values;
    //         const item = fullTranslates.find(
    //             (i) =>
    //                 i.key === key.trim() &&
    //                 (namespace === i.namespace ||
    //                     (i.namespace === 'default' &&
    //                         (namespace ?? '').trim()) === ''),
    //         );
    //         if (item) {
    //             setErrors({ ...errors, key: 'this key exist' });
    //         }
    //         console.log(item);
    //     }
    // }, [values]);

    React.useEffect(() => {
        if (translateData.loaded && id == 'edit') {
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
                                    deleteTranslatesByKeyAndLangRequest(
                                        { key, namespace, language },
                                        {
                                            onSuccess: () => {
                                                dispatch(
                                                    getTranslatesByKeyRequest({
                                                        key: key,
                                                        namespace: namespace,
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
                if (currentLang && text && translateToLang) {
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

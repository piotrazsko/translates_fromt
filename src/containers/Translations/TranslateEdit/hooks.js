import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { getDataFromCurrentLocarion } from 'helpers/url';
import { showPopupAction } from 'modules/popups';
import {
    getTranslatesByKeyRequest,
    getTranslatesByKeySelector,
    setTranslatesByKeyRequest,
    deleteTranslatesByIdAndLangRequest,
    getRecommendedTranslateRequest,
    updateTranslatesByKeyRequest,
} from 'modules/translations';
import {
    getApplicationByIdRequest,
    getApplicationByIdSelector,
} from 'modules/applications';

import { getPlanByIdSelector } from 'modules/plans';
import { useGetMissingLangs } from './missingLanguages';

import get from 'lodash/get';

const validationSchema = (t) =>
    yup.object({
        key: yup.string().required(t('errors.field_reuired')),
        translations: yup.array().of(
            yup.object().shape({
                language: yup.string().required(t('errors.field_reuired')),
                value: yup.string().required((data) => {
                    return t('errors.field_reuired');
                }),
            }),
        ),
    });

export const useHook = ({ location, history, applicationId, id, classes }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const applicationData = useSelector(getApplicationByIdSelector);
    const currentPlan = useSelector(getPlanByIdSelector);

    const [autoTranslate, setAutoTranslate] = React.useState(false); //  use it for disable auto translate.  maybe we can use it for switch

    React.useEffect(() => {
        dispatch(getApplicationByIdRequest({ applicationId }));
    }, [applicationId]);

    const { key, namespace } = React.useMemo(() => {
        const { search } = location;
        return getDataFromCurrentLocarion(search);
    }, [location]);

    const isAdd = id === 'add';

    React.useEffect(() => {
        if (!isAdd) {
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
        values,
        handleSubmit,
        setFieldValue,
        setErrors,
        errors,
    } = useFormik({
        initialValues: {
            key: '',
            namespace: namespace !== 'all_namespaces_' ? namespace : '',
            translations: [
                { id: Math.random().toString(), language: '', value: '' },
            ],
        },
        validationSchema: validationSchema(t),
        onSubmit: (values) => {
            console.log(values);
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

    const { missingLanguages, translatesOnServer, existLangs } =
        useGetMissingLangs({
            applicationId,
            data: values,
            translateData,
        });

    const disableAdd =
        values.translations.length >= currentPlan?.maxLanguages ||
        existLangs.length >= currentPlan?.maxLanguages;

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
        (data, translations = values) => {
            const id = `elem${Math.round(Math.random() * 10000).toString()}`;
            setFieldValue('translations', [
                ...translations.translations,
                { id, language: '', value: '', ...data },
            ]);
            setTimeout(() => {
                const elem = document.querySelector(`#${id}`);
                if (elem) {
                    elem.scrollIntoView();
                    elem.focus();
                }
            }, 100);
        },
        [values],
    );

    const onDelete = React.useCallback(
        (
            itemIndex,
            { key, namespace, language, value },
            { values, translatesOnServer },
        ) => {
            if (values.translations.length > 1) {
                if (translatesOnServer.includes(language) && language) {
                    dispatch(
                        showPopupAction({
                            message: t('message.delete_translate_item'),
                            title: t('message.delete_translate_item_text'),

                            onClick: () => {
                                setFieldValue('translations', [
                                    ...values.translations.filter(
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
                    setFieldValue('translations', [
                        ...values.translations.filter(
                            (i, index) => index !== itemIndex,
                        ),
                    ]);
                }
            }
        },
        [],
    );

    const onGetReccomendedTranslation = React.useCallback(
        (ev, index, values) => {
            if (index > 0) {
                const currentLang = get(values, 'translations[0].language');
                const text = get(values, 'translations[0].value');
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
                                        `translations[${index}].value`,
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
        [],
    );

    // BUG: fix onchange  have error with null and undefined
    const onChangeLanguage = React.useCallback(
        (index) => (ev, value) => {
            if (typeof value === 'object' && value !== null) {
                console.log(value);
                setFieldValue(`translations.${index}.language`, value.id);
            } else {
                setFieldValue(
                    `translations.${index}.language`,
                    ev.target.value || value || undefined, // fixed bug with validation null
                );
            }
        },
        [],
    );

    return {
        handleSubmit,
        onChangeLanguage,
        t,
        handleChange,
        values,
        errors,
        onGetReccomendedTranslation,
        setFieldValue,
        onDelete,
        key,
        namespace,
        onAdd,
        missingLanguages,
        translatesOnServer,
        existLangs,
        applicationData,
        isAdd,
        disableAdd,
    };
};

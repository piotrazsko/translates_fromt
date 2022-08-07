import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import {
    getApplicationByIdRequest,
    getApplicationByIdSelector,
    updateApplicationRequest,
    getFullUrlRequest,
    getFullUrlSelector,
} from 'modules/applications';
import { getTextfieldErrorFromResponse } from 'helpers/error';
import { saveToClipBoard } from 'helpers/clipboard';
import { showInfo } from 'modules/notification';

const validationSchema = yup.object({
    applicationName: yup.string().min(6).max(16).required(),
});

export const useHook = ({ id, location, history, classes }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (id) {
            dispatch(getApplicationByIdRequest({ applicationId: id }));
            dispatch(getFullUrlRequest({ applicationId: id }));
        }
    }, [id]);

    const applicationData = useSelector(getApplicationByIdSelector) || {};
    const { url } = useSelector(getFullUrlSelector);

    const { handleSubmit, values, handleChange, errors, setErrors } = useFormik(
        {
            onSubmit: (data) => {
                dispatch(
                    updateApplicationRequest(
                        { ...data, applicationId: id },
                        {
                            onSuccess: onCancel,
                            onFailure: getTextfieldErrorFromResponse({
                                field: 'applicationName',
                                setErrors,
                                errors,
                            }),
                        },
                    ),
                );
            },
            initialValues: {
                applicationName: applicationData.name,
                url: url,
            },
            enableReinitialize: true,
            validationSchema: validationSchema,
        },
    );
    const onCancel = () => {
        history.push('/applications');
    };
    const onSaveToClipBoard = (str) => {
        saveToClipBoard(dispatch, t)(str);
    };
    return {
        t,
        handleSubmit,
        values,
        handleChange,
        errors,
        onCancel,
        onSaveToClipBoard,
    };
};

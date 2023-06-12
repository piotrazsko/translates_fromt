import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { showPopupAction } from 'modules/popups';
import get from 'lodash/get';
import {
    getApplicationByIdRequest,
    getApplicationByIdSelector,
    updateApplicationRequest,
    getFullUrlRequest,
    getFullUrlSelector,
    deleteApplicationRequest,
} from 'modules/applications';
import {
    getExportJsonRequest,
    postImportJsonRequest,
    getExportXMLRequest,
} from 'modules/translations';

import {
    getStatisticsByApplicationRequest,
    getStatisticsByApplicationSelector,
} from 'modules/statistics';

import { getTextfieldErrorFromResponse } from 'helpers/error';
import { saveToClipBoard } from 'helpers/clipboard';

const getFullData = (dispatch, applicationId) => {
    if (applicationId) {
        dispatch(getApplicationByIdRequest({ applicationId }));
        dispatch(getFullUrlRequest({ applicationId }));
        dispatch(getStatisticsByApplicationRequest({ applicationId }));
    }
};

export const useUploadTranslates = ({ applicationId, onSuccess }) => {
    const ref = React.useRef(null);
    const dispatch = useDispatch();
    const uploadAction = React.useCallback(() => {
        if (ref.current) {
            const upload = function () {
                // setTranzactionsFile(ref.current.files[0]);
                const fd = new FormData();
                fd.append('translate', ref.current.files[0]);
                fd.append('applicationId', applicationId);
                dispatch(
                    postImportJsonRequest(fd, {
                        onSuccess: () => {
                            getFullData(dispatch, applicationId);
                        },
                    }),
                );
                ref.current.removeEventListener('change', upload);
            };
            ref.current.addEventListener('change', upload);
            ref.current.click();
        }
    }, []);
    return { onUpload: uploadAction, inputFileRef: ref };
};

export const useDownloadTranslates = ({ applicationId }) => {
    const dispatch = useDispatch();
    const onDownloadJSON = React.useCallback(() => {
        dispatch(
            getExportJsonRequest(
                { applicationId },
                {
                    onSuccess: (response) => {
                        const exportJson = get(response, 'data');
                        const resJson = JSON.stringify(exportJson);
                        const data =
                            'text/json;charset=utf-8,' +
                            encodeURIComponent(resJson);
                        const link = document.createElement('a');
                        link.href = 'data:' + data;
                        link.download = 'data.json';
                        link.click();
                    },
                },
            ),
        );
    }, []);
    const onDownloadXML = React.useCallback(() => {
        dispatch(
            getExportXMLRequest(
                { applicationId },
                {
                    onSuccess: async (response) => {
                        const exportXML = get(response, 'data');
                        const blobUrl = URL.createObjectURL(exportXML);

                        function download(filename, data) {
                            var element = document.createElement('a');

                            element.href = blobUrl;
                            element.setAttribute('download', filename);
                            element.style.display = 'none';
                            document.body.appendChild(element);

                            element.click();

                            document.body.removeChild(element);
                        }
                        download('zip.zip', exportXML);
                    },
                },
            ),
        );
    }, []);
    return { onDownloadJSON, onDownloadXML };
};

export const useDeleteApllication = ({ onSuccess = () => {} }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const onDelete = (data) => {
        dispatch(
            showPopupAction({
                title: t('applications.confirm_delete'),
                onClick: () => {
                    dispatch(
                        deleteApplicationRequest(
                            { applicationId: data.id },
                            {
                                onSuccess: () => {
                                    dispatch(onSuccess());
                                },
                            },
                        ),
                    );
                    return true;
                },
                onCancel: () => true,
                showCancel: true,
                submitButtonText: t('applications.confirm_delete'),
                cancelButtonText: t('button.cancel'),
                confirmButtonProps: {
                    color: 'error',
                    variant: 'outlined',
                },
                subtitle: 'Are you sure you want to delete AppName?',
                cancelButtonProps: {
                    variant: 'contained',
                },
            }),
        );
    };
    return { onDelete };
};

const validationSchema = yup.object({
    applicationName: yup.string().min(6).max(16).required(),
});

export const useGetFullData = (id) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        getFullData(dispatch, id);
    }, [id]);
};

export const useHook = ({ id, location, history, classes }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    useGetFullData(id);

    const applicationData = useSelector(getApplicationByIdSelector) || {};
    const applicationStatistics = useSelector(
        getStatisticsByApplicationSelector,
    );
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
        history.goBack();
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
        applicationData,
        url,
        applicationStatistics,
    };
};

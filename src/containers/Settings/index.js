import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import get from 'lodash/get';
import Typography from '@mui/material/Typography';
import { showPopupAction } from 'modules/popups';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import * as yup from 'yup';

import { useTranslation } from 'react-i18next';
import { PageSkeleton } from 'components';

import { showError, showWarning } from 'modules/notification';
import { deleteAllTranslatesAction } from 'modules/translations';
import { LangAutocompleate } from 'components';

import {
    getExportJsonRequest,
    postUploadJsonByLangRequest,
    postImportJsonRequest,
} from 'modules/translations';

const validationSchema = yup.object({
    language: yup.string().required(),
});

const Settings = ({ ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const ref2 = React.useRef(null);

    const ref = React.useRef(null);
    const uploadAction = React.useCallback(() => {
        if (ref.current) {
            const upload = function () {
                // setTranzactionsFile(ref.current.files[0]);
                const fd = new FormData();
                fd.append('translate', ref.current.files[0]);
                dispatch(postImportJsonRequest(fd));
                ref.current.removeEventListener('change', upload);
            };
            ref.current.addEventListener('change', upload);
            ref.current.click();
        }
    }, []);

    const onDelete = () => {
        dispatch(
            showPopupAction({
                message: t('message.delete_translate_item'),
                title: t('message.delete_translate_item_text'),

                onClick: () => {
                    dispatch(deleteAllTranslatesAction());
                    return true;
                },
                onCancel: () => true,
                showCancel: true,
                submitButtonText: t('button.ok'),
                cancelButtonText: t('button.cancel'),
                confirmButtonProps: {
                    color: 'secondary',
                    style: { marginLeft: '10px' },
                },
                cancelButtonProps: {},
            }),
        );
    };

    const fd = React.useMemo(() => new FormData(), []);
    const [fileName, setFileName] = React.useState('');

    const onUploadTranslatesByLang = () => {
        if (ref2.current) {
            const upload = function () {
                fd.append('translate', ref2.current.files[0]);
                setFileName(ref2.current.files[0].name);
                ref2.current.removeEventListener('change', upload);
            };
            ref2.current.addEventListener('change', upload);
            ref2.current.click();
        }
    };

    const {
        handleChange,
        handleBlur,
        handleReset,
        touched,
        values,
        handleSubmit,
        setErrors,
        errors,
    } = useFormik({
        initialValues: {
            language: '',
        },
        validationSchema: validationSchema,
        onSubmit: () => {
            fd.append('language', values.language);
            dispatch(
                postUploadJsonByLangRequest(fd, {
                    onSuccess: () => {
                        setFileName('');
                        fd.delete('language');
                        fd.delete('translate');
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
        <>
            <PageSkeleton title={t('title.settings')}>
                <Typography variant="body1">
                    {t('text.manage_your_translates')}
                </Typography>
                <Grid container spacing={6}>
                    <Grid item xs={4}>
                        <Button variant="contained" onClick={uploadAction}>
                            {t('button.upload_json')}
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={onDelete}
                        >
                            {t('button.delete_all_translates')}
                        </Button>
                    </Grid>
                </Grid>
                <input accept=".json" hidden ref={ref} type="file" />
            </PageSkeleton>
        </>
    );
};

Settings.propTypes = {
    // : PropTypes.
};

export default Settings;

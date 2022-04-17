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
import { deleteAllTranslatesAction } from 'modules/translates';
import { LangAutocompleate } from 'components';

import {
    getExportJsonRequest,
    postUploadJsonByLangRequest,
    postImportJsonRequest,
} from 'modules/translates';

const validationSchema = yup.object({
    language: yup.string().required(),
});

const Settings = ({ ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const onDownload = React.useCallback(() => {
        dispatch(
            getExportJsonRequest(
                {},
                {
                    onSuccess: (response) => {
                        console.log(response);
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

    const ref = React.useRef(null);
    const ref2 = React.useRef(null);

    const uploadAction = React.useCallback(() => {
        if (ref.current) {
            const upload = function() {
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
            const upload = function() {
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
                        <Button variant="contained" onClick={onDownload}>
                            {t('button.download_json')}
                        </Button>
                    </Grid>
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
            {/* <PageSkeleton>
                <Typography variant="body1">
                    {t('text.upload_translates')}
                </Typography>
                <Grid container>
                    <Grid item xs={2}>
                        <Box>{fileName}</Box>
                        <Button
                            variant="contained"
                            onClick={onUploadTranslatesByLang}
                        >
                            {t('button.download_json')}
                        </Button>
                        <input accept=".json" hidden ref={ref2} type="file" />
                    </Grid>
                    <Grid item xs={3}>
                        <LangAutocompleate
                            variant="outlined"
                            value={values.language}
                            placeholder={t('placeholder.language_key')}
                            onChange={handleChange('language')}
                            helperText={errors.language}
                            error={errors.language}
                        />
                       
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" onClick={handleSubmit}>
                            {t('button.save')}
                        </Button>
                    </Grid>
                </Grid>
            </PageSkeleton> */}
        </>
    );
};

Settings.propTypes = {
    // : PropTypes.
};

export default Settings;

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import makeStyles from '@mui/styles/makeStyles';
import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';

import { getDataFromUrl } from 'helpers/url';
import { showPopupAction } from 'modules/popups';

import { Pane, LangAutocompleate } from 'components';
import {
    getTranslatesByKeyRequest,
    getTranslatesByKeySelector,
    setTranslatesByKeyRequest,
    deleteTranslatesByKeyAndLangRequest,
    getRecommendedTranslateRequest,
} from 'modules/translates';

const validationSchema = yup.object({
    key: yup.string().required(),
    translates: yup.array().of(
        yup.object().shape({
            language: yup.string().required(),
            value: yup.string().required(),
        }),
    ),
});
const useStyles = makeStyles((theme) => ({
    container: {
        paddingBottom: '20px',
    },
}));

const EditTranslate = ({
    route,
    match: {
        params: { id },
    },
    location,
    history,
    ...props
}) => {
    const { key, namespace } = React.useMemo(() => {
        const { search } = location;
        return getDataFromUrl(search);
    }, [location]);
    const { t } = useTranslation();
    const dispatch = useDispatch();
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
                                color: 'secondary',
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
                console.log({
                    key,
                    namespace,
                    language,
                });
            }
        },
        [values.translates],
    );
    const classes = useStyles();

    // console.log(values);

    // React.useEffect(()=>{
    //     if(values.translates>)
    // },[values.translates])

    const onBlur = React.useCallback(
        (ev, index) => {
            if (index > 0) {
                const currentLang = get(values, 'translates[0].language');
                console.log(values);
                const text = get(values, 'translates[0].value');
                console.log(currentLang, text);
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

    return (
        <Pane title={t('title.edit')}>
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    classes={{ root: classes.container }}
                    spacing={2}
                >
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            disabled={id === 'edit'}
                            placeholder={t('input.key')}
                            label={t('input.key')}
                            variant="outlined"
                            required
                            id="outlined-error"
                            onChange={handleChange('key')}
                            onBlur={handleBlur('key')}
                            value={values.key}
                            error={Boolean(errors.key)}
                            helperText={errors.key}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            disabled={id === 'edit'}
                            placeholder={t('input.namespace')}
                            label={t('input.namespace')}
                            variant="outlined"
                            onChange={handleChange('namespace')}
                            onBlur={handleBlur('namespace')}
                            value={values.namespace}
                            error={Boolean(errors.namespace)}
                            helperText={errors.namespace}
                        />
                    </Grid>
                    <Grid item xs={7}>
                        {values.translates.map((i, index) => {
                            return (
                                <Grid container spacing={2} key={i.id}>
                                    <Grid item xs={4}>
                                        <LangAutocompleate
                                            fullWidth
                                            onBlur={(ev, value) =>
                                                onBlur(ev, index)
                                            }
                                            placeholder={t('input.language')}
                                            label={t('input.language')}
                                            variant="outlined"
                                            onChange={(ev, value) => {
                                                setFieldValue(
                                                    `translates.${index}.language`,
                                                    ev.target.value || value,
                                                );
                                            }}
                                            value={get(
                                                values,
                                                `translates.${index}.language`,
                                                null,
                                            )}
                                            error={Boolean(
                                                get(
                                                    errors,
                                                    `translates.${index}.language`,
                                                    null,
                                                ),
                                            )}
                                            helperText={get(
                                                errors,
                                                `translates.${index}.language`,
                                                null,
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={7}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            maxRows={4}
                                            placeholder={t('input.value')}
                                            label={t('input.value')}
                                            variant="outlined"
                                            onChange={handleChange(
                                                `translates.${index}.value`,
                                            )}
                                            onBlur={handleBlur(
                                                `translates.${index}.value`,
                                            )}
                                            value={get(
                                                values,
                                                `translates.${index}.value`,
                                                null,
                                            )}
                                            error={Boolean(
                                                get(
                                                    errors,
                                                    `translates.${index}.value`,
                                                    null,
                                                ),
                                            )}
                                            helperText={get(
                                                errors,
                                                `translates.${index}.value`,
                                                null,
                                            )}
                                        />
                                    </Grid>
                                    {values.translates.length > 1 ? (
                                        <Grid item xs={1}>
                                            <IconButton
                                                tabIndex={-1}
                                                color="secondary"
                                                onClick={() =>
                                                    onDelete(index, {
                                                        language: get(
                                                            values,
                                                            `translates.${index}.language`,
                                                            null,
                                                        ),
                                                        key,
                                                        namespace,
                                                        value: get(
                                                            values,
                                                            `translates.${index}.value`,
                                                            null,
                                                        ),
                                                    })
                                                }
                                                size="large"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Grid>
                                    ) : null}
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                            color="primary"
                            onClick={onAdd}
                            size="large"
                        >
                            <Add />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                history.goBack();
                            }}
                        >
                            {t('button.cancel')}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            {t('button.save')}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Pane>
    );
};

EditTranslate.propTypes = {};

export default EditTranslate;

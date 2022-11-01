/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';

import { PageSkeleton, LangAutocompleate, Footer, Pane } from 'components';
import { useHook } from './hooks';
import { Paper, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingBottom: '20px',
    },
    missingOption: {
        fontSize: '12px',
    },
}));

const EditTranslate = ({
    route,
    match: {
        params: { id, applicationId },
    },
    location,
    setTitle,
    history,
    ...props
}) => {
    const classes = useStyles();
    const {
        handleSubmit,
        t,
        handleChange,
        values,
        errors,
        onGetReccomendedTranslation,
        onDelete,
        key,
        namespace,
        onAdd,
        missingLanguages,
        onChangeLanguage,
        translatesOnServer,
        existLangs,
    } = useHook({ id, location, history, classes, applicationId });

    setTitle(t('translation.title'));

    return (
        <PageSkeleton
            headerControlls={
                missingLanguages.length > 0 ? (
                    <Box>
                        <Typography>
                            {t('translations.missing_translates')}
                        </Typography>
                        <Typography color="error">
                            {missingLanguages.join(', ')}
                        </Typography>
                    </Box>
                ) : null
            }
            footer={
                <Footer
                    deleteProps={{
                        children: t('translations.delete_translations'),
                    }}
                    cancelProps={{
                        children: t('translations.cancel'),
                    }}
                    submitProps={{
                        children: t('translations.save_translations'),
                    }}
                    onDelete={onDelete}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        history.goBack();
                    }}
                />
            }
        >
            <Pane>
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
                                variant="filled"
                                required
                                size="medium"
                                id="outlined-error"
                                onChange={handleChange('key')}
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
                                variant="filled"
                                size="medium"
                                onChange={handleChange('namespace')}
                                value={values.namespace}
                                error={Boolean(errors.namespace)}
                                helperText={errors.namespace}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            {values.translations.map((i, index) => {
                                return (
                                    <Grid container spacing={2} key={i.id}>
                                        <Grid item xs={4}>
                                            <LangAutocompleate
                                                fullWidth
                                                optionsExtraData={
                                                    <Typography
                                                        className={
                                                            classes.missingOption
                                                        }
                                                    >
                                                        {t(
                                                            'translation.missing_translate',
                                                        )}
                                                    </Typography>
                                                }
                                                disabledOptions={existLangs}
                                                disabled={translatesOnServer.includes(
                                                    i.language,
                                                )}
                                                size="medium"
                                                extraOptions={[
                                                    ...missingLanguages.map(
                                                        (i) => ({
                                                            id: i,
                                                            label: i,
                                                            isExtra: true,
                                                        }),
                                                    ),
                                                ]}
                                                placeholder={t(
                                                    'translation.language',
                                                )}
                                                label={t(
                                                    'translation.language',
                                                )}
                                                variant="filled"
                                                onChange={onChangeLanguage(
                                                    index,
                                                )}
                                                value={get(
                                                    values,
                                                    `translation.${index}.language`,
                                                    null,
                                                )}
                                                error={Boolean(
                                                    get(
                                                        errors,
                                                        `translation.${index}.language`,
                                                        null,
                                                    ),
                                                )}
                                                helperText={get(
                                                    errors,
                                                    `translation.${index}.language`,
                                                    null,
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                variant="filled"
                                                size="small"
                                                maxRows={4}
                                                placeholder={t(
                                                    'translation.value',
                                                )}
                                                label={t('translation.value')}
                                                onChange={handleChange(
                                                    `translation.${index}.value`,
                                                )}
                                                value={get(
                                                    values,
                                                    `translation.${index}.value`,
                                                    null,
                                                )}
                                                error={Boolean(
                                                    get(
                                                        errors,
                                                        `translation.${index}.value`,
                                                        null,
                                                    ),
                                                )}
                                                helperText={get(
                                                    errors,
                                                    `translation.${index}.value`,
                                                    null,
                                                )}
                                            />
                                        </Grid>
                                        {values.translations.length > 1 ? (
                                            <Grid item xs={1}>
                                                <IconButton
                                                    tabIndex={-1}
                                                    color="error"
                                                    onClick={() =>
                                                        onDelete(
                                                            index,
                                                            {
                                                                language: get(
                                                                    values,
                                                                    `translation.${index}.language`,
                                                                    null,
                                                                ),
                                                                key,
                                                                namespace,
                                                                value: get(
                                                                    values,
                                                                    `translation.${index}.value`,
                                                                    null,
                                                                ),
                                                            },
                                                            {
                                                                values,
                                                                translatesOnServer,
                                                            },
                                                        )
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
                                onClick={(data) => onAdd(data, values)}
                                size="large"
                            >
                                <Add />
                            </IconButton>
                        </Grid>
                    </Grid>
                </form>
            </Pane>
        </PageSkeleton>
    );
};

EditTranslate.propTypes = {};

export default EditTranslate;

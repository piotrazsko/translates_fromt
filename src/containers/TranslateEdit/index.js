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

import { PageSkeleton, LangAutocompleate } from 'components';
import { useHook } from './hooks';
import { Typography } from '@mui/material';

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

    return (
        <PageSkeleton
            headerControlls={
                missingLanguages.length > 0 ? (
                    <Box>
                        <Typography>
                            {t('translates.missing_translates')}
                        </Typography>
                        <Typography color="error">
                            {missingLanguages.join(', ')}
                        </Typography>
                    </Box>
                ) : null
            }
            title={t('title.edit')}
        >
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    classes={{ root: classes.container }}
                    spacing={2}
                >
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            size="small"
                            disabled={id === 'edit'}
                            placeholder={t('input.key')}
                            label={t('input.key')}
                            variant="outlined"
                            required
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
                            size="small"
                            disabled={id === 'edit'}
                            placeholder={t('input.namespace')}
                            label={t('input.namespace')}
                            variant="outlined"
                            onChange={handleChange('namespace')}
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
                                            optionsExtraData={
                                                <Typography
                                                    className={
                                                        classes.missingOption
                                                    }
                                                >
                                                    {t(
                                                        'translates.missing_translate',
                                                    )}
                                                </Typography>
                                            }
                                            disabledOptions={existLangs}
                                            disabled={translatesOnServer.includes(
                                                i.language,
                                            )}
                                            extraOptions={[
                                                ...missingLanguages.map(
                                                    (i) => ({
                                                        id: i,
                                                        label: i,
                                                        isExtra: true,
                                                    }),
                                                ),
                                            ]}
                                            size="small"
                                            placeholder={t('input.language')}
                                            label={t('input.language')}
                                            variant="outlined"
                                            onChange={onChangeLanguage(index)}
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
                                            size="small"
                                            maxRows={4}
                                            placeholder={t('input.value')}
                                            label={t('input.value')}
                                            variant="outlined"
                                            onChange={handleChange(
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
                                                color="error"
                                                onClick={() =>
                                                    onDelete(
                                                        index,
                                                        {
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
        </PageSkeleton>
    );
};

EditTranslate.propTypes = {};

export default EditTranslate;

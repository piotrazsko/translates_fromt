/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import makeStyles from '@mui/styles/makeStyles';
import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';

import { PageSkeleton, LangAutocompleate } from 'components';
import { useHook } from './hooks';

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
    const classes = useStyles();
    const {
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
    } = useHook({ id, location, history, classes });

    return (
        <PageSkeleton title={t('title.edit')}>
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
                                                color="error"
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
        </PageSkeleton>
    );
};

EditTranslate.propTypes = {};

export default EditTranslate;

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import makeStyles from '@mui/styles/makeStyles';
import InputAdornment from '@mui/material/InputAdornment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';

import { PageSkeleton, Pane, EditPageSkeleton } from 'components';
import { useHook } from './hooks';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingBottom: '20px',
    },
}));

const ApplicationEdit = ({
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
        values,
        handleChange,
        errors,
        onCancel,
        onSaveToClipBoard,
    } = useHook({
        id,
        location,
        history,
        classes,
        applicationId,
    });

    return (
        <PageSkeleton title={t('application.edit')}>
            <EditPageSkeleton onSave={handleSubmit} onCancel={onCancel}>
                <Pane>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                value={id}
                                variant="standard"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    onSaveToClipBoard(id)
                                                }
                                                size="small"
                                            >
                                                <ContentCopyIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                value={values.applicationName}
                                onChange={handleChange('applicationName')}
                                helperText={errors.applicationName}
                                error={errors.applicationName}
                            />
                        </Grid>
                    </Grid>
                </Pane>
            </EditPageSkeleton>
        </PageSkeleton>
    );
};

ApplicationEdit.propTypes = {};

export default ApplicationEdit;

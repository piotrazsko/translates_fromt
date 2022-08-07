/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import makeStyles from '@mui/styles/makeStyles';
import InputAdornment from '@mui/material/InputAdornment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Statistic from './components/Statistic';

import {
    PageSkeleton,
    Pane,
    EditPageSkeleton,
    GridGenerator,
    Cell,
} from 'components';
import { useHook } from './hooks';

import style from './style.scss';

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
        url,
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
                <GridGenerator
                    cols={12}
                    rows={1}
                    // showGrid
                    cellProps={{
                        children: ({ col, row }) => <div></div>,
                    }}
                    gap={[12, 12]}
                >
                    <Cell
                        col={0}
                        row={0}
                        colSpan={7}
                        rowSpan={1}
                        component={
                            <Pane title={t('application.edit_block')}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            value={id}
                                            variant="standard"
                                            placeholder={t(
                                                'application.application_id',
                                            )}
                                            label={t(
                                                'application.application_id',
                                            )}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() =>
                                                                onSaveToClipBoard(
                                                                    id,
                                                                )
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
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            InputLabelProps={{ shrink: true }}
                                            placeholder={t(
                                                'application.application_name',
                                            )}
                                            label={t(
                                                'application.application_name',
                                            )}
                                            value={values.applicationName}
                                            onChange={handleChange(
                                                'applicationName',
                                            )}
                                            helperText={errors.applicationName}
                                            error={errors.applicationName}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            multiline
                                            rows={4}
                                            InputLabelProps={{ shrink: true }}
                                            placeholder={t(
                                                'application.application_full_link',
                                            )}
                                            label={t(
                                                'application.application_full_link',
                                            )}
                                            value={values.url}
                                            helperText={errors.url}
                                            error={errors.url}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() =>
                                                                onSaveToClipBoard(
                                                                    url,
                                                                )
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
                                </Grid>
                            </Pane>
                        }
                    />
                    <Cell
                        col={7}
                        row={0}
                        colSpan={5}
                        rowSpan={1}
                        component={<Statistic t={t} />}
                    />
                </GridGenerator>
            </EditPageSkeleton>
        </PageSkeleton>
    );
};

ApplicationEdit.propTypes = {};

export default ApplicationEdit;

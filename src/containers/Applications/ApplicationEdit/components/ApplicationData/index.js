import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { CopyToClipBoardButton } from 'components';

import style from './style.scss';

const ApplicationData = ({
    values,
    handleChange,
    errors,
    onSaveToClipBoard,
    url,
    t,
    id,
    ...props
}) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    value={id}
                    disabled
                    variant="filled"
                    placeholder={t('application.application_id')}
                    label={t('application.application_id')}
                    InputProps={{
                        endAdornment: (
                            <CopyToClipBoardButton
                                onClick={() => onSaveToClipBoard(id)}
                            />
                        ),
                        shrink: true,
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    variant="filled"
                    InputLabelProps={{ shrink: true }}
                    placeholder={t('application.application_name')}
                    label={t('application.application_name')}
                    value={values.applicationName}
                    onChange={handleChange('applicationName')}
                    helperText={errors.applicationName}
                    error={errors.applicationName}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    disabled
                    variant="filled"
                    multiline
                    rows={4}
                    minRows={4}
                    size="medium"
                    InputLabelProps={{ shrink: true }}
                    placeholder={t('application.application_full_link')}
                    label={t('application.application_full_link')}
                    value={values.url}
                    helperText={errors.url}
                    error={errors.url}
                    InputProps={{
                        endAdornment: (
                            <CopyToClipBoardButton
                                onClick={() => onSaveToClipBoard(url)}
                            />
                        ),
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default ApplicationData;

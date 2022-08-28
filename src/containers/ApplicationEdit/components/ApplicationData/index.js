import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';

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
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    value={id}
                    disabled
                    variant="standard"
                    placeholder={t('application.application_id')}
                    label={t('application.application_id')}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => onSaveToClipBoard(id)}
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
                    variant="standard"
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
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => onSaveToClipBoard(url)}
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
    );
};

export default ApplicationData;

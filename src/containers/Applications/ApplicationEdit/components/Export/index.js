import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    upload: {
        marginLeft: 24,
    },
    buttonContainer: {
        marginTop: 20,
    },
    text: {
        fontWeight: 400,
    },
});

const Export = ({ data = {}, t, onDownload, onUpload, inputFileRef }) => {
    const classes = useStyles();
    return (
        <>
            <Typography variant="body2" className={classes.text}>
                {t('application.export_text')}
            </Typography>
            <Box className={classes.buttonContainer}>
                <Button onClick={onDownload} variant="contained">
                    {t('application.button_export_translates')}
                </Button>
                <Button
                    className={classes.upload}
                    onClick={onUpload}
                    variant="contained"
                >
                    {t('application.button_import_translates')}
                </Button>
                <input accept=".json" hidden ref={inputFileRef} type="file" />
            </Box>
        </>
    );
};

export default Export;

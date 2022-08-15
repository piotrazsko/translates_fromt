import React from 'react';
import { Button } from '@mui/material';

import style from './style.scss';

const Export = ({ data = {}, t, onDownload, onUpload, inputFileRef }) => {
    return (
        <>
            <Button onClick={onDownload} variant="contained">
                {t('application.button_export_translates')}
            </Button>
            <Button
                className={style.upload}
                onClick={onUpload}
                variant="contained"
            >
                {t('application.button_import_translates')}
            </Button>
            <input accept=".json" hidden ref={inputFileRef} type="file" />
        </>
    );
};

export default Export;

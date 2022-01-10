import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { Pane } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { showError, showWarning } from 'modules/notification';

import {
    getExportJsonRequest,
    exportJSONSelector,
    postImportJsonRequest,
} from 'modules/translates';

const Settings = ({ ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const onDownload = React.useCallback(() => {
        dispatch(getExportJsonRequest());
    }, []);

    const ref = React.useRef(null);
    const exportJson = useSelector(exportJSONSelector);

    React.useEffect(() => {
        if (exportJson.loaded) {
            const resJson = JSON.stringify(exportJson);
            console.log(resJson);
            const data =
                'text/json;charset=utf-8,' +
                encodeURIComponent(JSON.stringify(resJson));
            const link = document.createElement('a');
            link.href = 'data:' + data;
            link.download = 'data.json';
            link.click();
        }
    }, [exportJson]);

    // const [clientsFile, setClientsFile] = React.useState();

    // console.log(clientsFile);

    const uploadAction = () => {
        if (ref.current) {
            const upload = function() {
                // setTranzactionsFile(ref.current.files[0]);
                var fd = new FormData();
                fd.append('translate', ref.current.files[0]);
                dispatch(postImportJsonRequest(fd));
                ref.current.removeEventListener('change', upload);
            };
            ref.current.addEventListener('change', upload);
            ref.current.click();
        }
    };

    return (
        <>
            <Pane title={t('title.settings')}>
                <Typography variant="body1">{t('user_about_me')}</Typography>
                <Button variant="contained" onClick={onDownload}>
                    {t('button.download_json')}
                </Button>
                <Button variant="contained" onClick={() => uploadAction()}>
                    {t('button.upload_json')}
                </Button>
                <input accept=".json" hidden ref={ref} type="file" />
            </Pane>
        </>
    );
};

Settings.propTypes = {
    // : PropTypes.
};

export default Settings;

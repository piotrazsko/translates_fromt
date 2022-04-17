import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { PageSkeleton } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserRequest, getCurrentUserSelector } from 'modules/auth';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { showInfo } from 'modules/notification';
import { saveToClipBoard } from 'helpers/clipboard';

const APIPage = ({ ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getCurrentUserRequest());
    }, []);
    const saveToClipBoadrdAndMessage = React.useCallback(
        (str) => (ev) => {
            saveToClipBoard(str);
            dispatch(
                showInfo({
                    message: t('message.copied_to_clipboard'),
                }),
            );
        },
        [],
    );
    const { apiKey, url, ...user } = useSelector(getCurrentUserSelector);

    return (
        <>
            <PageSkeleton title={t('title.api')}>
                <Box>
                    <Typography gutterBottom variant="body1" display="inline">
                        {t('text.your_api_key')}
                    </Typography>
                    <Typography
                        gutterBottom
                        display="inline"
                        variant="body2"
                        onClick={saveToClipBoadrdAndMessage(apiKey)}
                    >
                        {apiKey}
                    </Typography>
                </Box>
                {url ? (
                    <Box>
                        <Typography
                            gutterBottom
                            variant="body1"
                            display="inline"
                        >
                            {t('text.your_api_url')}
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="body2"
                            display="inline"
                            onClick={saveToClipBoadrdAndMessage(url)}
                        >
                            {url}
                        </Typography>
                        <Typography variant="subtitle2">
                            "en" - is a language code
                            {/* TODO: add to translate */}
                        </Typography>
                    </Box>
                ) : null}
            </PageSkeleton>
        </>
    );
};

APIPage.propTypes = {
    // : PropTypes.
};

export default APIPage;

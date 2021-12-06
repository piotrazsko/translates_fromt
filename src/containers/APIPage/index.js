import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { Pane } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRequst, getUserSelector } from 'modules/user';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

const APIPage = ({ ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getUserRequst());
    }, []);
    const { apiKey, url, ...user } = useSelector(getUserSelector);
    return (
        <>
            <Pane title={t('title.api')}>
                <Box>
                    <Typography gutterBottom variant="body1" display="inline">
                        {t('text.your_api_key')}
                    </Typography>
                    <Typography gutterBottom display="inline" variant="body2">
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
                        >
                            {url}
                        </Typography>
                        <Typography variant="subtitle2">
                            Where "en" - language code
                        </Typography>
                    </Box>
                ) : null}
            </Pane>
        </>
    );
};

APIPage.propTypes = {
    // : PropTypes.
};

export default APIPage;

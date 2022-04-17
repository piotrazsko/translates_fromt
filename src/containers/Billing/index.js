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

const Billing = ({ ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getCurrentUserRequest());
    }, []);
    const { apiKey, url, ...user } = useSelector(getCurrentUserSelector);
    return (
        <>
            <PageSkeleton title={t('title.billing')}>
                <Box>
                    <Typography gutterBottom variant="body1" display="inline">
                        {t('text.billing')}
                    </Typography>
                </Box>
            </PageSkeleton>
        </>
    );
};

Billing.propTypes = {
    // : PropTypes.
};

export default Billing;

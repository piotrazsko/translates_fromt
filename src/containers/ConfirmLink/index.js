import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { confirmLinkRequest } from 'modules/auth';
import { PageSkeleton } from 'components';

const ConfirmLink = ({ location, history, ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    React.useEffect(() => {
        const search = new URLSearchParams(location.search);
        const token = search.get('token');
        dispatch(
            confirmLinkRequest(
                { token },
                {
                    onSuccess: () => {
                        setTimeout(() => {
                            // history.push('/');
                        }, 10000);
                    },
                },
            ),
        );
    }, [location]);
    return (
        <>
            <PageSkeleton title={t('title.email_confirmation')}>
                <Typography variant="body1">
                    {t('text.email_confirmation')}
                </Typography>
            </PageSkeleton>
        </>
    );
};

ConfirmLink.propTypes = {
    // : PropTypes.
};

export default ConfirmLink;

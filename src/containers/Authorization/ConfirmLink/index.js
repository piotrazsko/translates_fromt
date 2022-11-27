import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { confirmLinkRequest } from 'modules/auth';

import Skeleton from '../components/Skeleton';

const ConfirmLink = ({ location, history, ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        const search = new URLSearchParams(location.search);
        const token = search.get('token');
        dispatch(
            confirmLinkRequest(
                { token },
                {
                    onSuccess: () => {
                        setSuccess(true);
                    },
                    onFailure: () => {
                        setError(true);
                    },
                },
            ),
        );
    }, [location]);
    return (
        <Skeleton
            title={
                error || success
                    ? success
                        ? t('confirm_link.title_success')
                        : t('confirm_link.title_error')
                    : t('confirm_link.title_loading')
            }
            subtitle={
                error || success
                    ? success
                        ? t('confirm_link.subtitle_success')
                        : t('confirm_link.subtitle_error')
                    : ''
            }
        ></Skeleton>
    );
};

ConfirmLink.propTypes = {
    // : PropTypes.
};

export default ConfirmLink;

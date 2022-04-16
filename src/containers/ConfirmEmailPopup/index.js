import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUserSelector, sendConfirmLinkRequest } from 'modules/auth';
import { Popup } from 'components';
import { useTranslation } from 'react-i18next';

const ConfirmEmailPopup = (props) => {
    const [showPopup, switchPopup] = React.useState(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserSelector);
    React.useEffect(() => {
        if (currentUser.loaded && !currentUser.confirmedEmail) {
            switchPopup(true);
        }
    }, [currentUser]);

    return showPopup ? (
        <Popup
            shwoPopup={showPopup}
            title={t('title.confirm_email')}
            message={t('text.confirm_email')}
            confirmButtonProps={{
                color: 'secondary',
            }}
            classes={
                {
                    // buttonContainer: style.buttonContainer,
                }
            }
            submitButtonText={t('button.send')}
            cancelButtonText={t('button.cancel')}
            onSubmit={(ev) => {
                dispatch(
                    sendConfirmLinkRequest(
                        { email: currentUser.email },
                        {
                            onSuccess: () => {
                                switchPopup(!showPopup);
                            },
                        },
                    ),
                );
            }}
            onCancel={(ev) => {
                switchPopup(!showPopup);
            }}
        ></Popup>
    ) : null;
};

ConfirmEmailPopup.propTypes = {};

export default ConfirmEmailPopup;

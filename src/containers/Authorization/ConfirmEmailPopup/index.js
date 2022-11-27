import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUserSelector, sendConfirmLinkRequest } from 'modules/auth';
import { Popup } from 'components';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';

const ConfirmEmailPopup = () => {
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
            title={t('confirm_link.popup_title')}
            message={
                <Box display={'flex'} justifyContent="center">
                    {t('confirm_link.popup_content')}
                </Box>
            }
            confirmButtonProps={{
                color: 'primary',
            }}
            classes={{}}
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

export default ConfirmEmailPopup;

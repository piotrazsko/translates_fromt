import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { Pane } from 'components';
import { useDispatch } from 'react-redux';
import { showError, showWarning } from 'modules/notification';

const Settings = ({ ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <>
            <Pane title={t('title.settings')}>
                <Typography variant="body1">{t('user_about_me')}</Typography>
            </Pane>
        </>
    );
};

Settings.propTypes = {
    // : PropTypes.
};

export default Settings;

import React from 'react';
import { Pane } from 'components';
import { useTranslation } from 'react-i18next';

const Applications = ({ style }) => {
    const { t } = useTranslation();

    return <Pane style={style} title={t('dashboard.application')}></Pane>;
};

export default Applications;

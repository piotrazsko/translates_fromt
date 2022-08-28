import React from 'react';
import { Pane } from 'components';
import { useTranslation } from 'react-i18next';

const Statistics = ({ style }) => {
    const { t } = useTranslation();

    return <Pane style={style} title={t('dashboard.statistics')}></Pane>;
};

export default Statistics;

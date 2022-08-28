import React from 'react';
import { Pane } from 'components';
import { useTranslation } from 'react-i18next';

const MyPlan = ({ style }) => {
    const { t } = useTranslation();

    return <Pane style={style} title={t('dashboard.my_plan')}></Pane>;
};

export default MyPlan;

import React from 'react';
import { Pane } from 'components';
import { useTranslation } from 'react-i18next';

const Transactions = ({ style }) => {
    const { t } = useTranslation();

    return <Pane style={style} title={t('dashboard.transactions')}></Pane>;
};

export default Transactions;

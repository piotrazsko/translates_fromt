import React from 'react';
import { Pane } from 'components';
import { useTranslation } from 'react-i18next';
import Item from './components/Item';

const Statistics = ({ style, data }) => {
    const { t } = useTranslation();
    const keys = Object.keys(data);

    return (
        <Pane style={style} title={t('dashboard.statistics')}>
            {keys.map((i) => (
                <Item index={i} value={data[i]} title={t(`dashboard.${i}`)} />
            ))}
        </Pane>
    );
};

export default Statistics;

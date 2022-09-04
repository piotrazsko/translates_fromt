import React from 'react';
import { Pane } from 'components';
import { useTranslation } from 'react-i18next';

import styles from './style.scss';

const MyPlan = ({ style, data, history }) => {
    const { t } = useTranslation();
    console.log(data);
    return (
        <Pane
            classes={{ container: styles.container }}
            menuItems={[
                {
                    title: t('dashboard.update_plan'),
                    onClick: () => {
                        history.push('/update-plan');
                    },
                },
            ]}
            style={style}
            title={t('dashboard.my_plan')}
        ></Pane>
    );
};

export default MyPlan;

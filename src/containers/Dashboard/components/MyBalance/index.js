import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Pane } from 'components';

import styles from './style.scss';

const MyBalance = ({ style }) => {
    const { t } = useTranslation();

    return (
        <Pane
            style={style}
            classes={{ container: styles.container }}
            title={
                <div>
                    <p className={styles.subtitle}>
                        {t('dashboard.my_balance')}
                    </p>
                    {'100$'}
                </div>
            }
        >
            <Link className={styles.link} to="/billing">
                {t('dashboard.make_payment')}
            </Link>
        </Pane>
    );
};

export default MyBalance;

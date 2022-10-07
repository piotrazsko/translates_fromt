import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';

import { Pane } from 'components';
import { ReactComponent as Bullet } from './item.svg';

import styles from './style.scss';

const MyBalance = ({
    style,
    data: { name, maxTranslates, maxApplications, maxLanguages, ...data } = {},
}) => {
    const { t } = useTranslation();

    return (
        <Pane
            style={style}
            classes={{
                container: styles.container,
                content: styles.content,
                header: styles.header,
            }}
            title={
                <Typography>
                    <span className={styles.subtitle}>
                        {t('dashboard.my_plan')}
                    </span>
                </Typography>
            }
        >
            <Typography variant="h1">{name}</Typography>
            <Box marginTop={'36px'}>
                <Typography className={styles.bullet}>
                    <Bullet />
                    <span className={styles.item}>
                        {t('dashboard.max_translations', {
                            count: maxTranslates,
                        })}
                    </span>
                </Typography>
                <Typography className={styles.bullet}>
                    <Bullet />
                    <span className={styles.item}>
                        {t('dashboard.max_applications', {
                            count: maxApplications,
                        })}
                    </span>
                </Typography>
                <Typography className={styles.bullet}>
                    <Bullet />
                    <span className={styles.item}>
                        {t('dashboard.max_languages', { count: maxLanguages })}
                    </span>
                </Typography>
            </Box>

            {/* <Link className={styles.link} to="/billing">
                {t('dashboard.make_payment')}
            </Link> */}
        </Pane>
    );
};

export default MyBalance;

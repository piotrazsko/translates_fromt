import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';

import { Pane } from 'components';

import styles from './style.scss';

const MyPlan = ({ style, data, history }) => {
    const { t } = useTranslation();
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
        >
            <Typography variant="h3">{data.name}</Typography>
            <br />s<Typography variant="h4">Price:{data.price}$</Typography>
            <Typography variant="h4">
                Max translates:{data.maxTranslates}
            </Typography>
            <Typography variant="h4">
                Max aplications:{data.maxApplications}
            </Typography>
            <Typography variant="body">{data.description}</Typography>
        </Pane>
    );
};

export default MyPlan;

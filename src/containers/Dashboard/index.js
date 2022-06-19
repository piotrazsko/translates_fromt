import React from 'react';
import { PageSkeleton, Pane, LanguageSelect } from 'components';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

const Dashboard = ({ ...props }) => {
    const { t } = useTranslation();
    return (
        <PageSkeleton title={t('dashboard.title')}>
            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <Pane title={'dashboard.pane1'}>Dashboard</Pane>
                </Grid>
                <Grid item xs={6}>
                    <Pane>Dashboard</Pane>
                </Grid>
            </Grid>
        </PageSkeleton>
    );
};

export default Dashboard;

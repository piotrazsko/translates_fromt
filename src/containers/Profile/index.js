import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Pane } from 'components';
import { useDispatch } from 'react-redux';
import { showError, showWarning } from 'modules/notification';
import Account from './components/Account';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.primary.main}`,
    },
}));

const Profile = ({ ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [tab, setTab] = React.useState(0);
    const classes = useStyles();
    return (
        <>
            <Pane title={t('title.profile')}>
                <Grid container spacing={6}>
                    <Grid item xs={3}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={tab}
                            onChange={(ev, value) => setTab(value)}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                            <Tab label={t('tabs.account')} />
                            <Tab label={t('tabs.activities')} />
                        </Tabs>
                    </Grid>

                    <Grid xs={8}>{tab === 0 ? <Account /> : null}</Grid>
                </Grid>
            </Pane>
        </>
    );
};

Profile.propTypes = {
    // : PropTypes.
};

export default Profile;

import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';

import MobileScreen from '../MobileScreen';
import { SideBar } from 'components';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '60px',
        display: 'flex',
    },
}));

const Layout = ({
    myPermissionsSelector,
    children,
    viewPort,
    userIsMaster,
    currentUserData,
    currentLocalization,
    ...rest
}) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { isMobile } = viewPort ?? {};

    const [isEndOfPage, setEndOfPage] = React.useState(false);
    const restWithPermissons = {
        viewPort,
        isEndOfPage,
        children,
        currentLocalization,
        ...rest,
    };

    return (
        <>
            <Helmet>
                <title>{t('default.user_name')}</title>
            </Helmet>
            <Container maxWidth="lg" classes={{ root: classes.root }}>
                <Grid container>
                    <Grid item xs={12}>
                        {React.createElement(children, restWithPermissons)}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

Layout.propTypes = {
    viewPort: PropTypes.shape({ isMobile: PropTypes.bool.isRequired })
        .isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.any,
        PropTypes.arrayOf(PropTypes.element),
    ]),
    myPermissionsSelector: PropTypes.object,
    currentLocalization: PropTypes.string,
};

export default Layout;

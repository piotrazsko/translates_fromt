import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';

import Header from './components/Header';

const useStyles = makeStyles((theme) => ({
    root: {},
    container: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    box: {
        marginTop: '10vh',
        width: '400px',
        background: theme.palette.common.white,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.03)',
        borderRadius: '20px',
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
                <title>{t('default.application_name')}</title>
            </Helmet>
            <Grid item xs={12}>
                <Header></Header>
            </Grid>
            <Container maxWidth="lg" classes={{ root: classes.root }}>
                <Grid container>
                    <Grid item xs={12} className={classes.container}>
                        <Box className={classes.box}>
                            {React.createElement(children, restWithPermissons)}
                        </Box>
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

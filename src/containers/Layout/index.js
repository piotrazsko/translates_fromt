import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { SideBar, Header } from 'components';

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
    currentLocalization,
    history,
    route: { showHeader = true },
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
        history,
        ...rest,
    };

    return (
        <>
            <Helmet>
                <title>{t('user_name')}</title>
            </Helmet>
            {showHeader ? <Header history={history} /> : null}
            <Container maxWidth="lg" classes={{ root: classes.root }}>
                <Grid container spacing={2}>
                    <Grid item md={2} lg={2}>
                        <SideBar isMobile={isMobile} {...restWithPermissons} />
                    </Grid>
                    <Grid item md={10} lg={10}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Paper>
                                    {React.createElement(
                                        children,
                                        restWithPermissons,
                                    )}
                                </Paper>
                            </Grid>
                        </Grid>
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

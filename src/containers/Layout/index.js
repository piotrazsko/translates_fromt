import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import {
    sideBarSelector,
    expandSidebarAction,
    collapseSidebarAction,
} from 'modules/sidebar';
import { logoutAction } from 'modules/auth';

import { SideBar, Header } from 'components';

const useStyles = makeStyles((theme) => ({
    rootExpanded: {
        display: 'grid',
        gridTemplateColumns: '240px repeat(23, 1fr)',
        gridTemplateRows: '64px repeat(23, 1fr)',
        gridColumnGap: '30px',
        gridRowGap: '30px',
        minHeight: '100vh',
        height: '100%',
        width: '100vw',
    },
    root: {
        display: 'grid',
        gridTemplateColumns: '80px repeat(23, 1fr)',
        gridTemplateRows: '64px repeat(23, 1fr)',
        gridColumnGap: '30px',
        gridRowGap: '30px',
        minHeight: '100vh',
        height: '100%',
        width: '100vw',
    },
    page: {
        gridArea: '2 / 2 / 25 / 25',
        paddingRight: '30px',
        // paddingBottom: '30px',
    },
    sideBar: {
        gridArea: '1 / 1 / 25 / 2',
    },
    header: {
        gridArea: '1 / 2 / 2 / 25',
        position: 'sticky',
        top: '0px',
        marginLeft: '-30px',
        zIndex: 3,
    },
}));

const Layout = ({
    myPermissionsSelector,
    children,
    viewPort,
    currentLocalization,
    history,
    route: { showHeader = true, showSidebar = true, defaultTitle },
    ...rest
}) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { isMobile } = viewPort ?? {};
    const [title, setTitle] = React.useState(defaultTitle);

    const dispatch = useDispatch();
    const sidebarExpanded = useSelector(sideBarSelector);
    const setSidebarExpanded = () => {
        if (sidebarExpanded) {
            dispatch(collapseSidebarAction());
        } else {
            dispatch(expandSidebarAction());
        }
    };

    const [isEndOfPage, setEndOfPage] = React.useState(false);
    const restWithPermissons = {
        viewPort,
        isEndOfPage,
        children,
        currentLocalization,
        history,
        ...rest,
    };
    // const [sidebarExpanded, setSidebarExpanded] = React.useState(true);

    return (
        <>
            <Helmet>
                <title>{t('default.user_name')}</title>
            </Helmet>
            <Box
                className={
                    sidebarExpanded ? classes.rootExpanded : classes.root
                }
            >
                <Box className={classes.sideBar}>
                    {showSidebar ? (
                        <SideBar
                            onLogout={() => {
                                dispatch(logoutAction());
                            }}
                            isExpanded={sidebarExpanded}
                            onChangeExpand={setSidebarExpanded}
                            isMobile={isMobile}
                            {...restWithPermissons}
                        />
                    ) : null}
                </Box>
                <Box className={classes.header}>
                    {showHeader ? (
                        <Header history={history} title={title} />
                    ) : null}
                </Box>
                <Grid container className={classes.page}>
                    <Grid item xs={12}>
                        {React.createElement(children, {
                            ...restWithPermissons,
                            setTitle,
                        })}
                    </Grid>
                </Grid>
            </Box>
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

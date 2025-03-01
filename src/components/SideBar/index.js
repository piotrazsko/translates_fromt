import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { Logo, LogoFull } from 'assets/images/icons';
import {
    DashboardIcon,
    DocumentationIcon,
    ApplicationsIcon,
    SettingsIcon,
    TranslationIcon,
    LogoutIcon,
} from './icons';

const drawerWidth = '100%';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        display: 'block',
        height: '100vh',
        position: 'sticky',
        top: 0,
    },
    drawerPaper: {
        background: theme.palette.primary.main,
        width: drawerWidth,
        borderRadius: 0,
        position: 'static',
    },
    // necessary for content to be below app bar
    toolbar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 84,
        // paddingLeft: 30,
    },
    toolbarExpanded: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: 84,
        paddingLeft: 30,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    text: {
        color: theme.palette.common.white,
    },
    icon: {
        color: theme.palette.common.white,
        minWidth: '40px',
    },
    logout: {
        marginTop: 'auto',
    },
    selectedItem: {
        backgroundColor: '#7675ED !important',
        '&:before': {
            content: '""',
            backgroundColor: theme.palette.common.white,
            height: '100%',
            width: '3px',
            position: 'absolute',
            left: 0,
        },
    },
    drawerExpand: {
        color: theme.palette.common.white,
        position: 'absolute',
        top: 'calc(50% - 27px)',
        left: 'calc(100% - 20px)',
        zIndex: 2,
        width: 20,
        height: 54,
        background: '#B3B3FF',
        opacity: '0.4',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            opacity: '0.6',
        },
        //
    },
    drawerCollpased: {
        color: theme.palette.common.white,
        position: 'absolute',
        top: 'calc(50% - 27px)',
        left: '100%',
        zIndex: 2,
        width: 20,
        height: 54,
        background: '#B3B3FF',
        opacity: '0.4',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            opacity: '0.6',
        },
        //
    },
    rootItem: {
        minHeight: 51,
        paddingLeft: 30,
    },
    expandButton: {
        color: theme.palette.common.white,
    },
    fullIcon: {
        fill: theme.palette.common.white,
    },
}));

const getSideBarItems = (t, history) => [
    {
        title: t('sidebar.dashboard'),
        onClick: () => {
            history.push('/dashboard');
        },
        path: '/dashboard',
        icon: <DashboardIcon />,
    },
    {
        title: t('sidebar.applications'),
        onClick: () => {
            history.push('/applications');
        },
        path: '/applications',
        icon: <ApplicationsIcon />,
    },
    {
        title: t('sidebar.translates'),
        onClick: () => {
            history.push('/translations');
        },
        path: '/translations',
        icon: <TranslationIcon />,
    },
    {
        title: t('sidebar.docs'),
        onClick: () => {
            history.push('/docs');
        },
        path: '/docs',
        icon: <DocumentationIcon />,
    },
    // {
    //     title: t('sidebar.settings'),
    //     onClick: () => {
    //         history.push('/settings');
    //     },
    //     path: '/settings',
    //     icon: <SettingsIcon />,
    // },
];

export default function PermanentDrawerLeft({
    history,
    match: { path },
    match,
    isExpanded = true,
    onChangeExpand,
    onLogout,
}) {
    const classes = useStyles();
    const { t } = useTranslation();

    const items = React.useMemo(() => {
        return getSideBarItems(t, history);
    }, [history, t]);

    return (
        <>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div
                    className={
                        isExpanded
                            ? classes.drawerExpand
                            : classes.drawerCollpased
                    }
                >
                    <IconButton
                        disableRipple
                        onClick={() => onChangeExpand(!isExpanded)}
                        classes={{ root: classes.expandButton }}
                    >
                        {!isExpanded ? (
                            <KeyboardArrowRightIcon />
                        ) : (
                            <KeyboardArrowLeftIcon />
                        )}
                    </IconButton>
                </div>
                <div
                    className={
                        isExpanded ? classes.toolbarExpanded : classes.toolbar
                    }
                    onClick={() => history.push('/')}
                >
                    {isExpanded ? (
                        <LogoFull className={classes.fullIcon} />
                    ) : (
                        <Logo />
                    )}
                </div>
                <List>
                    {items.map((i, index) => {
                        return (
                            <ListItemButton
                                classes={{
                                    selected: classes.selectedItem,
                                    root: classes.rootItem,
                                }}
                                selected={path.indexOf(i.path) === 0}
                                key={i.title}
                                onClick={i.onClick}
                            >
                                <ListItemIcon classes={{ root: classes.icon }}>
                                    {i.icon}
                                </ListItemIcon>
                                {isExpanded ? (
                                    <ListItemText
                                        classes={{ primary: classes.text }}
                                        primary={i.title}
                                    />
                                ) : null}
                            </ListItemButton>
                        );
                    })}
                </List>
                <List className={classes.logout}>
                    <ListItemButton
                        onClick={() => {
                            onLogout();
                        }}
                        classes={{ root: classes.rootItem }}
                    >
                        <ListItemIcon classes={{ root: classes.icon }}>
                            <LogoutIcon />
                        </ListItemIcon>
                        {isExpanded ? (
                            <ListItemText
                                classes={{ primary: classes.text }}
                                primary={t('sidebar.logout')}
                            ></ListItemText>
                        ) : null}
                    </ListItemButton>
                </List>
            </Drawer>
        </>
    );
}

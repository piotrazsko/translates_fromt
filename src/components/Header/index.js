import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import makeStyles from '@mui/styles/makeStyles';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import { stringAvatar } from 'helpers/avatar';
import { userIsAuthSelector, getCurrentUserSelector } from 'modules/auth';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'static',
        borderRadius: 0,
    },
    toolbar: {
        padding: '20px 30px 0 30px',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    notificationIcon: {
        color: '#909090',
        height: 25,
    },
    title: {
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        cursor: 'pointer',
    },

    sectionDesktop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    name: {
        marginLeft: '-10px',
        color: '#909090',
        fontWeight: '500',
        cursor: 'pointer',
    },
}));

const Header = ({ history, title, ...props }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const userIsAuth = useSelector(userIsAuthSelector);
    const userData = useSelector(getCurrentUserSelector);

    return (
        <AppBar color="default" classes={{ root: classes.root }} elevation="0">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h2">{title}</Typography>

                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    {userIsAuth ? (
                        <IconButton
                            aria-label="show 17 new notifications"
                            color="inherit"
                            edge="end"
                        >
                            <Badge
                                badgeContent={null}
                                color="secondary"
                                variant="dot"
                                invisible
                            >
                                <NotificationsNoneIcon
                                    className={classes.notificationIcon}
                                />
                            </Badge>
                        </IconButton>
                    ) : null}
                    <Divider orientation="vertical" flexItem />
                    {userIsAuth && userData.loaded ? (
                        <>
                            <Avatar
                                {...stringAvatar(
                                    [
                                        userData.first_name,
                                        userData.last_name,
                                    ].join(' '),
                                )}
                                onClick={() => history.push('/profile')}
                            ></Avatar>
                            <Typography
                                onClick={() => history.push('/profile')}
                                className={classes.name}
                                variant="h5"
                            >
                                {`${userData.first_name} ${userData.last_name}`}
                            </Typography>
                        </>
                    ) : (
                        <IconButton
                            edge="end"
                            onClick={() => {
                                history.push('/login');
                            }}
                            color="inherit"
                            // size="large"
                        >
                            <ExitToAppOutlinedIcon />
                        </IconButton>
                    )}
                </div>
            </Toolbar>
        </AppBar>
        // {renderMenu}
        // </div>
    );
};

export default Header;

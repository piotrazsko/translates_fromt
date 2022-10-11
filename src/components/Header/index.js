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

import { userIsAuthSelector, getCurrentUserSelector } from 'modules/auth';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'static',
        borderRadius: 0,
    },
    toolbar: {
        padding: '0 30px',
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
}));

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width: 30,
            height: 30,
            fontSize: '0.8em',
            cursor: 'pointer',
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

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
                    {/* {userIsAuth ? (
                        <IconButton
                            aria-label="show 4 new mails"
                            color="inherit"
                            size="large"
                        >
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                    ) : null} */}
                    {userIsAuth ? (
                        <IconButton
                            aria-label="show 17 new notifications"
                            color="inherit"
                            edge="end"
                            // size="large"
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
                        <Avatar
                            {...stringAvatar(
                                [userData.first_name, userData.last_name]
                                    .join(' ')
                                    .toUpperCase(),
                            )}
                            onClick={() => history.push('/profile')}
                        ></Avatar>
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

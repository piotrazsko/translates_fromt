import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { alpha, makeStyles } from '@material-ui/core/styles';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import { logoutAction, userIsAuthSelector } from 'modules/auth';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        zIndex: 3,
        position: 'static',
    },
    root: {
        borderRadius: 0,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        cursor: 'pointer',
    },

    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));
const Header = ({ history, ...props }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { t } = useTranslation();
    const userIsAuth = useSelector(userIsAuthSelector);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (i) => {
        switch (i) {
            case 0:
                break;
            case 1:
                dispatch(logoutAction());
                history.push('/');
                break;

            default:
                break;
        }
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => handleMenuClose(0)}>Profile</MenuItem>
            <MenuItem onClick={() => handleMenuClose(1)}>
                {t('menuitem.logout')}
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar classes={{ root: classes.root }} elevation="1">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        onClick={() => {
                            history.push('/');
                        }}
                        className={classes.title}
                        variant="h6"
                        noWrap
                    >
                        Goman Live
                    </Typography>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {userIsAuth ? (
                            <IconButton
                                aria-label="show 4 new mails"
                                color="inherit"
                            >
                                <Badge badgeContent={4} color="secondary">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                        ) : null}
                        {userIsAuth ? (
                            <IconButton
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        ) : null}
                        {userIsAuth ? (
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        ) : (
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={() => {
                                    history.push('/login');
                                }}
                                color="inherit"
                            >
                                <ExitToAppOutlinedIcon />
                            </IconButton>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
};

export default Header;

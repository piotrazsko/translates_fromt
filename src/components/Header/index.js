import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { alpha } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

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
                history.push('/profile');
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
            <AppBar
                color="default"
                classes={{ root: classes.root }}
                elevation="1"
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        size="large">
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
                            <IconButton aria-label="show 4 new mails" color="inherit" size="large">
                                <Badge badgeContent={4} color="secondary">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                        ) : null}
                        {userIsAuth ? (
                            <IconButton aria-label="show 17 new notifications" color="inherit" size="large">
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
                                size="large">
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
                                size="large">
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

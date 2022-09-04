import React from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import styles from './style.scss';

const Pane = ({
    children,
    title = '',
    className,
    classes = {},
    style = {},
    menuItems = [],
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card
            className={[className, classes.container, styles.container].join(
                ' ',
            )}
            style={style}
        >
            <CardHeader
                title={title}
                titleTypographyProps={{
                    variant: 'h3',
                    gutterBottom: true,
                    className: styles.title,
                }}
                action={
                    menuItems.length ? (
                        <>
                            <IconButton
                                aria-label="settings"
                                color="primary"
                                onClick={handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                {menuItems.map((i) => (
                                    <MenuItem
                                        key={i.title}
                                        onClick={() => {
                                            i.onClick();
                                            handleClose();
                                        }}
                                    >
                                        {i.title}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    ) : null
                }
            ></CardHeader>
            <CardContent
                className={[classes.content, styles.content].join(' ')}
            >
                {children}
            </CardContent>
        </Card>
    );
};

Pane.propTypes = {
    cildren: PropTypes.any,
    title: PropTypes.string,
};

export default Pane;

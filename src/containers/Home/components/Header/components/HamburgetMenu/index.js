import React from "react";
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from "@mui/material/Fade";
import Box from '@mui/material/Box';


const HamburgerMenu = ({ listItems, postfixSection, ...props }) => {
    const [tab, setTab] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const clickMenuItem = (value) => {
        setTab(value)
        handleClose()
    }

    return (
        <Box>
            <Box
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {props.children}
            </Box>
            <Menu
                id="fade-menu"
                MenuListProps={{
                'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                PaperProps={{
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 0.5,
                        width: {
                            xs: "100%",
                            sm: 'fit-content'
                        },
                      }
                  }}
            >

                {listItems.map(item => (
                    <MenuItem 
                        selected={item.id === tab}
                        onClick={() => {clickMenuItem(item.id)}}
                    >{item.label}</MenuItem>
                ))}
                
                { postfixSection ? 
                    [
                        <Divider />,
                        <MenuItem>{postfixSection}</MenuItem>
                    ]
                    : null
                }
            </Menu>
        </Box>
    );
};

export default HamburgerMenu;

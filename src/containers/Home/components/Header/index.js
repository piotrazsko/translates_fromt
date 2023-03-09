import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Section from '../Section';
import { LogoFull } from 'assets/images/icons';
import style from './style.scss';
import { IconButton } from 'components';
import makeStyles from '@mui/styles/makeStyles';
import HamburgerMenu from './components/HamburgetMenu';
import { MenuIcon } from './icons';

const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    sectionMobile: {
        display: 'block',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

const navigationItems = [
    {
        id: 0,
        name: 'itemOne',
        label: 'Item One',
        variant: 'tab',
        styleType: 'tab', 
    },
    {
        id: 1,
        name: 'itemTwo',
        label: 'Item Two',
        variant: 'tab',
        styleType: 'tab',  
    },
    {
        id: 2,
        name: 'itemThree',
        label: 'Item Three',
        variant: 'tab',
        styleType: 'tab',
    }
]

export const Header = ({ history, isMobile, t }) => {
    const classes = useStyles();
    const [tab, setTab] = React.useState(0);

    const getFreeButton =   <Button
            variant="contained"
            onClick={() => {
                history.push('/dashboard');
            }}
            className={style.button}
        >
            Get Free
        </Button>

    return (
        <Section className={style.container}>
            <Box className={style.content}>
                <LogoFull />
                <Box className={classes.sectionDesktop}>
                    <Tabs
                        value={tab}
                        onChange={(data, value) => {
                            setTab(value);
                        }}
                    >
                        {navigationItems.map((item) => (
                            <Tab
                                className={style[item.styleType]}
                                disableRipple
                                label={item.label}
                                value={item.id}
                            />
                        ))}
                    </Tabs>
                    {getFreeButton}
                </Box>
                <Box className={classes.sectionMobile}>
                    <HamburgerMenu
                        listItems={navigationItems}
                        postfixSection={getFreeButton}
                    >
                        <IconButton
                            color="inherit"
                            size="extraLarge"
                        >
                            <MenuIcon />
                        </IconButton>
                    </HamburgerMenu>  
                </Box>
            </Box>
        </Section>
    );
};

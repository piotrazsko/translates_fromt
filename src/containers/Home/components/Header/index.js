import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Section from '../Section';
import { LogoFull } from 'assets/images/icons';
import style from './style.scss';

export const Header = ({ history, isMobile, t }) => {
    const [tab, setTab] = React.useState(0);
    return (
        <Section className={style.container}>
            <Box className={style.content}>
                <LogoFull />
                <Tabs
                    value={tab}
                    onChange={(data, value) => {
                        setTab(value);
                    }}
                >
                    <Tab
                        className={style.tab}
                        disableRipple
                        label="Item One"
                        value={0}
                    />
                    <Tab
                        className={style.tab}
                        disableRipple
                        label="Item Two"
                        value={1}
                    />
                    <Tab
                        className={style.tab}
                        disableRipple
                        label="Item Three"
                        value={2}
                    />
                </Tabs>
                <Button
                    variant="contained"
                    onClick={() => {
                        history.push('/dashboard');
                    }}
                    className={style.button}
                >
                    Get Free
                </Button>
            </Box>
        </Section>
    );
};

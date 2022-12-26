import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { LogoFull } from 'assets/images/icons';
import Section from '../Section';
import style from './style.scss';

export const Footer = ({ t }) => {
    return (
        <Box className={style.container}>
            <Section className={style.content}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Grid container columnSpacing={6}>
                            <Grid
                                md={6}
                                xs={12}
                                className={style.logoContainer}
                            >
                                <LogoFull fill="#fff" />
                            </Grid>

                            <Grid
                                md={2}
                                xs={12}
                                className={style.logoContainer}
                            >
                                <Typography>About us</Typography>
                                <Typography className={style.item}>
                                    <a href="mailto:test@test.com">
                                        Terms of use
                                    </a>
                                </Typography>
                                <Typography className={style.item}>
                                    <a href="mailto:test@test.com">
                                        Privacy Policy:
                                    </a>
                                </Typography>
                            </Grid>
                            <Grid
                                md={2}
                                xs={12}
                                className={style.logoContainer}
                            >
                                <Typography>Contacts</Typography>
                                <Typography className={style.item}>
                                    Email:
                                    <a href="mailto:test@test.com">
                                        test@test.com
                                    </a>
                                </Typography>
                                <Typography className={style.item}>
                                    Telegram:
                                    <a href="mailto:test@test.com">
                                        test@test.com
                                    </a>
                                </Typography>
                                <Typography className={style.item}>
                                    Skype:
                                    <a href="mailto:test@test.com">
                                        test@test.com
                                    </a>
                                </Typography>
                                <Typography className={style.item}>
                                    Facebook:
                                    <a href="mailto:test@test.com">
                                        test@test.com
                                    </a>
                                </Typography>
                            </Grid>
                            <Grid
                                md={2}
                                xs={12}
                                className={style.logoContainer}
                            >
                                <Typography>© 2023 Goman</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Section>
        </Box>
    );
};

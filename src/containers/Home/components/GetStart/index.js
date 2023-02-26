import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Section from '../Section';
import style from './style.scss';

export const SixthSection = ({ t }) => {
    return (
        <Section className={style.container}>
            <Grid container spacing={6} className={style.content}>
                <Grid item xs={12} className={style.textContainer}>
                    <Typography className={style.title}>
                        Let’s Get Started, It’s Free!
                    </Typography>

                    <Button
                        className={style.button}
                        variant="outlined"
                        fullWidth={false}
                    >
                        GET FREE
                    </Button>
                </Grid>
            </Grid>
        </Section>
    );
};

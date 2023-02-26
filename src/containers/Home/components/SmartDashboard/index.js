import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import image from 'assets/images/landing/dashboard.png';
import imageWebp from 'assets/images/landing/dashboard.webp';
import imageAvif from 'assets/images/landing/dashboard.avif';

import Section from '../Section';
import style from './style.scss';

export const EightSection = ({ t }) => {
    return (
        <Section className={style.container}>
            <Grid container spacing={6}>
                <Grid item md={6} xs={12} className={style.textContainer}>
                    <Typography className={style.title} variant="h1">
                        Smart
                        <br />
                        Dashboard
                    </Typography>
                    <Typography
                        className={style.subtitle}
                        sx={{ paddingTop: '30px' }}
                        variant="subtitle1"
                    >
                        How nice to have everything you need in one place!
                    </Typography>
                    <Typography
                        className={style.subtitle}
                        sx={{ paddingTop: '30px' }}
                        variant="subtitle1"
                    >
                        Here you can control all the necessary processes and
                        track your status.
                    </Typography>
                    <Typography
                        className={style.subtitle}
                        sx={{ paddingTop: '30px' }}
                        variant="subtitle1"
                    >
                        And remember, we are at the very beginning and we will
                        continue to add more and more useful features.
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                    <picture className={style.image}>
                        <source srcSet={imageAvif} type="image/avif"></source>
                        <source srcSet={imageWebp} type="image/webp"></source>
                        <img
                            src={image}
                            alt="diagramm"
                            className={style.image}
                        />
                    </picture>
                </Grid>
            </Grid>
        </Section>
    );
};

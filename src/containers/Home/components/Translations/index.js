import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import image from 'assets/images/landing/easily.png';
import imageWebp from 'assets/images/landing/easily.webp';
import imageAvif from 'assets/images/landing/easily.avif';

import Section from '../Section';
import style from './style.scss';

export const ForthSection = ({ t }) => {
    return (
        <Section className={style.container}>
            <Grid container spacing={6}>
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
                <Grid item md={6} xs={12} className={style.textContainer}>
                    <Typography className={style.title} variant="h1">
                        Easily add
                        <br />
                        and edit translations
                    </Typography>
                    <Typography
                        className={style.subtitle}
                        sx={{ paddingTop: '30px' }}
                        variant="subtitle1"
                    >
                        Adding translations is never easy, but we tried to make
                        it as easy and fast for you as possible!
                    </Typography>
                    <Typography
                        className={style.subtitle}
                        sx={{ paddingTop: '30px' }}
                        variant="subtitle1"
                    >
                        Simple and clear interface won't let you get confused
                        and you'll come back to us again and again!
                    </Typography>
                </Grid>
            </Grid>
        </Section>
    );
};

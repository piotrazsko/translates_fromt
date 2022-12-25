import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import image from 'assets/images/landing/way.png';
import imageWebp from 'assets/images/landing/way.webp';
import imageAvif from 'assets/images/landing/way.avif';

import Section from '../Section';
import style from './style.scss';

export const ThirdSection = ({ t }) => {
    return (
        <Section className={style.container}>
            <Grid container>
                <Grid item xs={12} className={style.textContainer}>
                    <Typography className={style.title}>
                        How it works
                    </Typography>
                    <Typography className={style.subtitle}>
                        We work to make your workflow as easy and fast as
                        possible
                    </Typography>
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

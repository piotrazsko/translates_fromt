import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import image from 'assets/images/landing/managment.png';
import imageWebp from 'assets/images/landing/managment.webp';
import imageAvif from 'assets/images/landing/managment.avif';

import Section from '../Section';
import style from './style.scss';

export const FivethSection = ({ t }) => {
    return (
        <Section className={style.container}>
            <Grid container spacing={6}>
                <Grid item xs={6} className={style.textContainer}>
                    <Typography className={style.title} variant="h1">
                        Management
                        <br />
                        Applications
                    </Typography>
                    <Typography
                        className={style.subtitle}
                        sx={{ paddingTop: '30px' }}
                        variant="subtitle1"
                    >
                        You can easily create new applications and make any
                        changes to them!
                    </Typography>
                    <Typography
                        className={style.subtitle}
                        sx={{ paddingTop: '30px' }}
                        variant="subtitle1"
                    >
                        One, two, three, or more applications at once work for
                        fun and we'll help you do it!
                    </Typography>
                </Grid>
                <Grid item xs={6}>
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

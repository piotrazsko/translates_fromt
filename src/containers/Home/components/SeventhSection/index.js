import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import image from 'assets/images/landing/integration.png';
import imageWebp from 'assets/images/landing/integration.webp';
import imageAvif from 'assets/images/landing/integration.avif';

import Section from '../Section';
import style from './style.scss';

export const SeventhSection = ({ t }) => {
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
                        Fast
                        <br />
                        Integration
                    </Typography>
                    <Typography
                        className={style.subtitle}
                        sx={{ paddingTop: '30px' }}
                        variant="subtitle1"
                    >
                        Just a little bit and it's done!
                    </Typography>
                    <Typography
                        className={style.subtitle}
                        sx={{ paddingTop: '30px' }}
                        variant="subtitle1"
                    >
                        Very convenient and fast integration of your
                        translations into the code will reduce development time
                        and simplify your work.
                    </Typography>
                    <Typography
                        className={style.subtitle}
                        sx={{ paddingTop: '30px' }}
                        variant="subtitle1"
                    >
                        Try it and you'll see for yourself!
                    </Typography>
                </Grid>
            </Grid>
        </Section>
    );
};

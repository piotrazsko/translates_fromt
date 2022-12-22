import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import image from 'assets/images/landing/ill.png';
import imageWebp from 'assets/images/landing/ill.webp';
import imageAvif from 'assets/images/landing/ill.avif';

import Section from '../Section';
import style from './style.scss';

export const FirstSection = ({ t }) => {
    return (
        <Section className={style.container}>
            <Grid container>
                <Grid item xs={6} className={style.textContainer}>
                    <Typography className={style.title} variant="h1">
                        Create.
                        <br />
                        Translate.
                        <br />
                        Integrate.
                    </Typography>
                    <Typography
                        className={style.subtitle}
                        sx={{ paddingTop: '30px' }}
                        variant="subtitle1"
                    >
                        For easy creation and implementation of translations in
                        your project.
                    </Typography>
                    <Typography
                        className={style.subtitle}
                        sx={{ paddingBottom: '30px' }}
                        variant="subtitle1"
                    >
                        Work with Goman!
                    </Typography>
                    <Box>
                        <Button variant="contained" fullWidth={false}>
                            Get Free
                        </Button>
                    </Box>
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

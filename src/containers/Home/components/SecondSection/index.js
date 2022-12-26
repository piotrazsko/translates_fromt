import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import image from 'assets/images/landing/free_plan.png';
import imageWebp from 'assets/images/landing/free_plan.webp';
import imageAvif from 'assets/images/landing/free_plan.avif';

import Section from '../Section';
import style from './style.scss';

export const SecondSection = ({ t }) => {
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
                    <Typography
                        className={style.subtitle}
                        sx={{ paddingBottom: '30px' }}
                        variant="subtitle1"
                    >
                        We are a young service that has developed a simple
                        solution for creating and integrating translations into
                        your projects. Easy exporting saves your time! Right now
                        you can explore all features and start working with
                        Goman!
                    </Typography>
                    <Box>
                        <Button variant="contained" fullWidth={false}>
                            Life Demo
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Section>
    );
};

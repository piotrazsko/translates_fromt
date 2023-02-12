import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { LogoFull } from 'assets/images/icons';
import Section from '../Section';
import style from './style.scss';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    laptopHidden: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    laptopMargined: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: '30px',
        },
    }
}));


export const Footer = ({ t }) => {
    const classes = useStyles();

    return (
        <Section className={style.container}>
            <Grid container spacing={6} columnSpacing={6} className={style.content}>
                <Grid md={6} sm={4} xs={12} className={style.columnContainer}>
                    <LogoFull fill="#fff" />
                    <Typography variant="body2" className={classes.laptopMargined}>122345@gmail.com</Typography>
                </Grid>

                <Grid md={1.5} sm={2} xs={0} className={[style.columnContainer, classes.laptopHidden]}>
                    <Typography>About</Typography>
                </Grid>

                <Grid md={1.5} sm={2} xs={0} className={[style.columnContainer, classes.laptopHidden]}>
                    <Typography>Process</Typography>
                </Grid>

                <Grid md={.5} sm={2} xs={0} className={[style.columnContainer, classes.laptopHidden]}>
                    <Typography>More</Typography>
                </Grid>

                <Grid md={1.5} sm={2} xs={12} className={style.columnContainer}>
                    <Typography className={classes.laptopHidden}>Contacts</Typography>
                    <Typography variant="body2">T of U & Policy</Typography>
                </Grid>
            </Grid>
        </Section>
    );
};

import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
    },
    content: {
        // margin: '30px 0 0 0 !important',
        whiteSpace: 'pre-wrap',
    },
    footerContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'sticky',
        bottom: '0',
    },
    buttonContainer: {
        marginLeft: '-30px',
        marginRight: '-30px',
        marginTop: '30px',
        minHeight: '76px',
        padding: '0 30px',
        display: 'flex',
        alignItems: 'center',
        'box-shadow': '0px 0px 1px 2px rgba(0, 0, 0, 0.03)',
    },
}));

const PageSkeleton = ({ children, verticalOffset = 0, footer = null }) => {
    const classes = useStyles();

    return (
        <Grid container classes={{ root: classes.container }}>
            <Grid
                classes={{
                    item: classes.content,
                }}
                style={{ paddingTop: `${verticalOffset}px` }}
                item
                xs={12}
            >
                {children}
            </Grid>
            {footer ? (
                <Grid xs={12} className={[classes.footerContainer].join(' ')}>
                    <Box className={classes.buttonContainer}>{footer}</Box>
                </Grid>
            ) : null}
        </Grid>
    );
};

PageSkeleton.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
    grey: PropTypes.bool,
};

export default PageSkeleton;

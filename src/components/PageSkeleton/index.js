import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
    container: {},
    content: {
        // margin: '30px 0 0 0 !important',
        whiteSpace: 'pre-wrap',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));

const PageSkeleton = ({
    title,
    children,
    verticalOffset = 0,
    grey = false,
    buttonProps = {},
    showButton = false,
    headerControlls = null,
}) => {
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
            <Grid xs={6} className={classes.buttonContainer}>
                {showButton ? <Button {...buttonProps}></Button> : null}xxxx
            </Grid>
        </Grid>
    );
};

PageSkeleton.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
    grey: PropTypes.bool,
};

export default PageSkeleton;

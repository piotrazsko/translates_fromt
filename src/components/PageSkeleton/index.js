import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
    container: {
        padding: '30px 30px 45px 30px',
    },
    content: {
        margin: '30px 0 0 0 !important',
        whiteSpace: 'pre-wrap',
    },
}));

const PageSkeleton = ({
    title,
    children,
    verticalOffset = 0,
    grey = false,
}) => {
    const classes = useStyles();
    return (
        <Grid container classes={{ root: classes.container }}>
            <Grid item xs={12}>
                <Typography variant="h1">{title}</Typography>
            </Grid>
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
        </Grid>
    );
};

PageSkeleton.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
    grey: PropTypes.bool,
};

export default PageSkeleton;

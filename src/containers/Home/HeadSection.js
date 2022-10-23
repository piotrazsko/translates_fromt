import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Grid, Typography, Card, Button, Hidden, Box } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) =>
    <WrappedComponent {...props} width="xs" />;

const styles = (theme) => ({});

function HeadSection(props) {
    const { classes, theme, width, history } = props;
    const { t } = useTranslation();
    return (
        <Fragment>
            {' '}
            <Link to="/dashboard">About</Link>
            test
        </Fragment>
    );
}

HeadSection.propTypes = {
    classes: PropTypes.object,
    width: PropTypes.string,
    theme: PropTypes.object,
};

export default withWidth()(
    withStyles(styles, { withTheme: true })(HeadSection),
);

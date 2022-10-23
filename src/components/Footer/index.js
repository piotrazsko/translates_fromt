import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    deleteButton: {},
    cancelButton: { marginLeft: 'auto' },
    submitButton: {},
});

const Footer = ({
    deleteProps = {},
    cancelProps = {},
    submitProps = {},
    onDelete = () => {},
    onCancel = () => {},
    onSubmit = () => [],
}) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <>
            <Button
                classes={{ root: classes.deleteButton }}
                variant="outlined"
                color="error"
                onClick={onDelete}
                {...deleteProps}
            >
                {t('button.delete')}
            </Button>
            <Button
                classes={{ root: classes.cancelButton }}
                variant="text"
                color="primary"
                onClick={onCancel}
                {...cancelProps}
            >
                {t('button.cancel')}
            </Button>
            <Button
                classes={{ root: classes.submitButton }}
                variant="contained"
                color="primary"
                onClick={onSubmit}
                {...submitProps}
            >
                {t('button.submit')}
            </Button>
        </>
    );
};

Footer.propTypes = {
    // : PropTypes.
};

export default Footer;

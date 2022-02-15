import React from 'react';
import PropTypes from 'prop-types';
import codes from 'iso-language-codes';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const LangAutocompleate = ({ ...props }) => {
    return (
        <Autocomplete
            freeSolo
            {...props}
            options={codes.map((option) => option.iso639_1)}
            renderInput={(params) => <TextField {...props} {...params} />}
        />
    );
};

LangAutocompleate.propTypes = {};

export default LangAutocompleate;

import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({ input: { paddingLeft: '8px' } });

const SearchField = ({
    searchText,
    setSearchText,
    placeholder,
    label,
    ...props
}) => {
    const classes = useStyles();
    return (
        <TextField
            fullWidth
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start" color="primary">
                        <SearchIcon color="primary" />
                    </InputAdornment>
                ),
                endAdornment: searchText ? (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => setSearchText('')}
                            size="small"
                        >
                            <ClearIcon fontSize="18" />
                        </IconButton>
                    </InputAdornment>
                ) : (
                    false
                ),
                classes: {
                    input: classes.input,
                },
            }}
            // required
            value={searchText}
            onChange={(ev) => setSearchText(ev.target.value)}
            variant="filled"
            placeholder={placeholder}
            label={label}
            {...props}
        />
    );
};
export default SearchField;

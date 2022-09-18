import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

const SearchField = ({
    searchText,
    setSearchText,
    placeholder,
    label,
    ...props
}) => {
    return (
        <TextField
            fullWidth
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start" color="primary">
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: searchText ? (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => setSearchText('')}
                            size="small"
                        >
                            <ClearIcon />
                        </IconButton>
                    </InputAdornment>
                ) : (
                    false
                ),
            }}
            // required
            value={searchText}
            onChange={(ev) => setSearchText(ev.target.value)}
            variant="outlined"
            placeholder={placeholder}
            label={label}
            {...props}
        />
    );
};
export default SearchField;

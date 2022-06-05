import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

export default function LanguageSelect({
    onChange,
    items = [],
    filter = () => true,
    value,
    label,
    variant,
    fullWidth = true,
    formControllProps = {},
    ...props
}) {
    return (
        <FormControl
            fullWidth={fullWidth}
            variant={variant}
            {...formControllProps}
        >
            <InputLabel id={label}>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                labelId={label}
                onChange={onChange}
                {...props}
            >
                {items.filter(filter).map((i) => (
                    <MenuItem key={i.value} value={i.value}>
                        {i.label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText></FormHelperText>
        </FormControl>
    );
}

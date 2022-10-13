import * as React from 'react';
import codes from 'iso-language-codes';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

console.log(codes);
export default function LanguageSelect({
    onChange,
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
                {codes.filter(filter).map((i) => (
                    <MenuItem key={i.iso639_1} value={i.iso639_1}>
                        {i.name}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText></FormHelperText>
        </FormControl>
    );
}

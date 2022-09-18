import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SelectDft from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

export default function Select({
    onChange,
    items = [],
    filter = () => true,
    value,
    label,
    variant,
    fullWidth = true,
    defaultValue,
    formControllProps = {},
    ...props
}) {
    const itemsPrepared = React.useMemo(() => {
        return items;
    }, [items]);

    return (
        <FormControl
            fullWidth={fullWidth}
            variant={variant}
            {...formControllProps}
        >
            <InputLabel id={label}>{label}</InputLabel>
            <SelectDft
                value={value}
                label={label}
                labelId={label}
                onChange={onChange}
                defaultValue={defaultValue}
                {...props}
            >
                {itemsPrepared.filter(filter).map((i) => (
                    <MenuItem key={i.value} value={i.value}>
                        {i.label}
                    </MenuItem>
                ))}
            </SelectDft>
            <FormHelperText></FormHelperText>
        </FormControl>
    );
}

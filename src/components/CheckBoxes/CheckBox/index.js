import React from 'react';
import { CheckboxNoIcon, CheckboxYesIcon } from 'assets/images/icons';
import CheckboxMui from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import style from './style.scss';

export const Checkbox = ({ label, ...props }) => {
    return (
        <FormControlLabel
            className={style.Checkbox}
            control={
                <CheckboxMui
                    disableRipple
                    icon={<CheckboxNoIcon height={20} width={20} />}
                    checkedIcon={<CheckboxYesIcon height={20} width={20} />}
                    {...props}
                />
            }
            label={label}
            classes={{ label: style.label }}
        />
    );
};

import React from 'react';
import PropTypes from 'prop-types';
import codes from 'iso-language-codes';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Flag from '../../Flag';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import style from './style.scss';

console.log(codes);
const LangAutocompleate = ({ extraOptions = [], ...props }) => {
    const { t } = useTranslation();
    const options = [
        ...extraOptions,
        ...codes.map((option) => ({
            id: option.iso639_1,
            label: option.iso639_1,
        })),
    ];
    return (
        <Autocomplete
            freeSolo
            {...props}
            options={options}
            renderInput={(params) => <TextField {...props} {...params} />}
            renderOption={(props, option) => {
                return (
                    <Box
                        component="li"
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                        {...props}
                        className={style.optionContainer}
                    >
                        <Box className={style.optionContent}>
                            {<Flag code={option.id} /> || (
                                <Box minWidth={'24px'} />
                            )}
                            <Typography className={style.text}>
                                {option.label}
                            </Typography>
                        </Box>
                        <Typography className={style.extra}>
                            {option.isExtra || null}
                        </Typography>
                    </Box>
                );
            }}
        />
    );
};

LangAutocompleate.propTypes = {};

export default LangAutocompleate;

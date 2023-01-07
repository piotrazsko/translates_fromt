import React from 'react';
import { Box } from '@mui/system';
import { LanguageSelect } from 'components';

export const Language = ({ handleChange, languages, currentLang }) => {
    const filter = (lang) => {
        return languages.find((i) => i === lang.iso639_1);
    };
    return (
        <Box>
            <LanguageSelect
                onChange={handleChange('language')}
                value={currentLang}
                variant={'filled'}
                filter={filter}
            />
        </Box>
    );
};

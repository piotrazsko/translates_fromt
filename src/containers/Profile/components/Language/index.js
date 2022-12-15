import React from 'react';
import { Box } from '@mui/system';
import { LanguageSelect } from 'components';

export const Language = ({ handleChange, languages, currentLang }) => {
    return (
        <Box>
            <LanguageSelect
                onChange={handleChange('language')}
                value={currentLang}
                variant={'filled'}
            />
        </Box>
    );
};

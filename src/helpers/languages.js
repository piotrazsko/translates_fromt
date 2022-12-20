import codes from 'iso-language-codes';

import * as flags from 'assets/images/flags';

export const languagesList = codes.map((option) => ({
    id: option.iso639_1,
    label: option.iso639_1,
    nativeName:
        option.name.length > 10
            ? option.name.slice(0, 10) + '...'
            : option.name,
    srcFlag: flags[option.iso639_1]?.default,
}));

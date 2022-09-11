import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import {
    getStatisticsByApplicationRequest,
    getStatisticsByApplicationSelector,
} from 'modules/statistics';

export const useGetMissingLangs = ({ applicationId, data, translateData }) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (applicationId) {
            dispatch(
                getStatisticsByApplicationRequest({
                    applicationId,
                }),
            );
        }
    }, [applicationId]);

    const { languagesList } = useSelector(getStatisticsByApplicationSelector);

    const { missingLanguages, translatesOnServer } = React.useMemo(() => {
        const translatesOnServer = get(translateData, 'translates', []).map(
            (i) => i.language,
        );
        if (data && languagesList) {
            const existLangs = data.translates.map((i) => i.language);
            return {
                missingLanguages: languagesList.filter(
                    (i) => !existLangs.includes(i),
                ),
                translatesOnServer,
            };
        }
        return { missingLanguages: [], translatesOnServer };
    }, [data, languagesList, translateData]);

    return { missingLanguages, translatesOnServer };
};

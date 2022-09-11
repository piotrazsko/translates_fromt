import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getStatisticsByApplicationRequest,
    getStatisticsByApplicationSelector,
} from 'modules/statistics';

export const useGetMissingLangs = ({ applicationId, data }) => {
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
    const missingLanguages = React.useMemo(() => {
        if (data && languagesList) {
            const existLangs = data.translates.map((i) => i.language);
            return languagesList.filter((i) => !existLangs.includes(i));
        }
        return [];
    }, [data, languagesList]);

    return { missingLanguages };
};

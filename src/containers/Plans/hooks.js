import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    getPlansRequest,
    getPlansSelector,
    updateUserPlanRequest,
} from 'modules/plans';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserSelector, getCurrentUserRequest } from 'modules/auth';

export const useHook = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const plans = useSelector(getPlansSelector);
    const user = useSelector(getCurrentUserSelector);
    React.useEffect(() => {
        dispatch(getPlansRequest());
    }, []);
    const onUpdate = (id) => {
        dispatch(
            updateUserPlanRequest(
                { planId: id },
                {
                    onSuccess: () => {
                        dispatch(getCurrentUserRequest());
                    },
                },
            ),
        );
    };
    return { t, plans, currentPlan: user.plan, onUpdate };
};

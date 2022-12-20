/* eslint-disable no-fallthrough */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import {
    getAllKeysByApplicarionRequest,
    getTranslatedListSelector,
    deleteTranslateByKeyRequest,
} from 'modules/translations';
import {
    getApplicationsListRequest,
    getApplicationsListSelector,
} from 'modules/applications';
import { showPopupAction } from 'modules/popups';
import { prepareSearchString, getDataFromCurrentLocarion } from 'helpers/url';

const useUrlSearch = ({
    namespace,
    setNamespace,
    setApplicationId,
    applicationId,
    searchText,
    setSearchText,
    history,
    pathname,
}) => {
    const { ...searchParams } = getDataFromCurrentLocarion();
    React.useEffect(() => {
        const {
            applicationId: appId,
            namespace: spc,
            searchText: search,
        } = searchParams;
        switch (true) {
            case applicationId !== appId:
                setApplicationId(appId);
            case namespace !== spc && spc:
                setNamespace(spc);
            case searchText !== search:
                setSearchText(search);
            default:
                if (!spc) {
                    setNamespace(allNameSpacesValue);
                }
                break;
        }
    }, []);

    React.useEffect(() => {
        const query = prepareSearchString({
            applicationId,
            namespace,
            searchText,
        });

        history.push(`${pathname}?${query}`);
    }, [applicationId, namespace, searchText]);

    const { applicationId: applicationIdFromUrl } = searchParams;

    return { applicationIdFromUrl };
};

const allNameSpacesValue = 'all_namespaces_';

export const useHook = ({ history, pathname, classes, ...props }) => {
    const [applicationId, setApplicationId] = React.useState(null);
    const [namespace, setNamespace] = React.useState(allNameSpacesValue);
    const [searchText, setSearchText] = React.useState();
    const { applicationIdFromUrl } = useUrlSearch({
        namespace,
        setNamespace,
        setApplicationId,
        applicationId,
        searchText,
        setSearchText,
        history,
        pathname,
    });

    const res = useSelector(getTranslatedListSelector);
    const applications = useSelector(getApplicationsListSelector);

    const { t } = useTranslation();

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getApplicationsListRequest());
    }, []);

    React.useEffect(() => {
        if (applicationId) {
            dispatch(getAllKeysByApplicarionRequest({ applicationId }));
        }
    }, [applicationId]);

    const { namespaces } = React.useMemo(() => {
        const tabs = new Set();
        res.forEach((i) => {
            tabs.add(i.namespace);
        });
        return {
            namespaces: [
                {
                    label: t('translations.all_namespaces'),
                    value: allNameSpacesValue,
                },
                ...Array.from(tabs).map((i) => ({
                    label: i || t('translations.default_namespace'),
                    value: i || '',
                })),
            ].sort((a, b) => {
                return a.value > b.value;
            }),
        };
    }, [res]);

    const data = React.useMemo(() => {
        return (
            searchText
                ? res.filter((item) => {
                      return (
                          `${item.key} ${item.namespace}`
                              .toLowerCase()
                              .indexOf(searchText.toLowerCase()) !== -1
                      );
                  })
                : res
        ).filter((i) =>
            namespace === null || namespace === allNameSpacesValue
                ? true
                : namespace === i.namespace,
        );
    }, [res, searchText, namespace]);

    const onDelete = React.useCallback(
        ({ translateId }) => {
            dispatch(
                showPopupAction({
                    message: t('message.delete_translate'),
                    title: t('message.delete_translate'),

                    onClick: () => {
                        dispatch(
                            deleteTranslateByKeyRequest(
                                { translateId, applicationId },
                                {
                                    onSuccess: () => {
                                        dispatch(
                                            getAllKeysByApplicarionRequest({
                                                applicationId,
                                            }),
                                        );
                                    },
                                },
                            ),
                        );
                        return true;
                    },
                    onCancel: () => true,
                    showCancel: true,
                    submitButtonText: t('button.ok'),
                    cancelButtonText: t('button.cancel'),
                    confirmButtonProps: {
                        color: 'error',
                        classes: { root: classes.root },
                    },
                    cancelButtonProps: {},
                }),
            );
        },
        [applicationId],
    );

    const applicationData = React.useMemo(() => {
        if (applicationId && applications.length > 0) {
            return applications.find((i) => i.id === applicationId);
        }
    }, [applicationId, applications]);

    return {
        allNameSpacesValue,
        applicationData,
        onDelete,
        data,
        namespace,
        namespaces,
        setNamespace,
        setSearchText,
        applicationId,
        applications,
        setApplicationId,
        searchText,
        applicationIdFromUrl,
        t,
    };
};

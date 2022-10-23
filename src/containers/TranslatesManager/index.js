import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import makeStyles from '@mui/styles/makeStyles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import {
    PagePlaceholder,
    PageSkeleton,
    Pane,
    Select,
    SearchField,
} from 'components';
import {
    getAllKeysByApplicarionRequest,
    getTranslatedListSelector,
    deleteTranslateByKeyRequest,
} from 'modules/translates';
import {
    getApplicationsListRequest,
    getApplicationsListSelector,
} from 'modules/applications';
import { showPopupAction } from 'modules/popups';
import { prepareSearchString, getDataFromCurrentLocarion } from 'helpers/url';

import TranslatesGrid from './components/TranslatesGrid';

const useStyle = makeStyles((theme) => ({
    buttonRoot: {
        marginLeft: '10px !important',
    },
    tabsRoot: { margin: '20px 0' },
    selectApplication: {
        maxWidth: '50%',
    },
}));

const TranslatesManager = ({
    history,
    location: { pathname, search },
    setTitle,
    ...props
}) => {
    const { applicationId: applicationIdFromUrl, ...rest } =
        getDataFromCurrentLocarion();

    const [applicationId, setApplicationId] = React.useState(null);
    const [tab, setTab] = React.useState(null);
    const [searchText, setSearchText] = React.useState();

    const res = useSelector(getTranslatedListSelector);
    const applications = useSelector(getApplicationsListSelector);

    const { t } = useTranslation();
    setTitle(t('title.translates'));

    const dispatch = useDispatch();
    const classes = useStyle();

    React.useEffect(() => {
        dispatch(getApplicationsListRequest());
    }, []);

    React.useEffect(() => {
        if (applicationIdFromUrl && !applicationId) {
            setApplicationId(applicationIdFromUrl);
        } else if (applications.length === 1 && !applicationId) {
            setApplicationId(applications[0].id);
        }
    }, [applications, applicationId, applicationIdFromUrl]);

    React.useEffect(() => {
        if (applicationId) {
            const url = prepareSearchString({ applicationId });
            history.push(`${pathname}?${url}`);
            dispatch(getAllKeysByApplicarionRequest({ applicationId }));
        }
    }, [applicationId, applicationIdFromUrl]);

    const { tabs } = React.useMemo(() => {
        const tabs = new Set();
        res.forEach((i) => {
            tabs.add(i.namespace);
        });
        return {
            tabs: [
                { label: t('tab.all_namespaces'), value: null },
                ...Array.from(tabs).map((i) => ({
                    label: i || t('tab.default_namespace'),
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
        ).filter((i) => (tab === null ? true : tab === i.namespace));
    }, [res, searchText, tab]);

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
    return (
        <>
            <Pane
                title={
                    <Select
                        formControllProps={{
                            classes: {
                                root: classes.selectApplication,
                            },
                            variant: 'filled',
                        }}
                        defaultOpen={!applicationIdFromUrl}
                        defaultValue={applicationId}
                        value={applicationId}
                        onChange={(ev) => {
                            setApplicationId(ev.target.value);
                        }}
                        items={applications.map((i) => ({
                            value: i.id,
                            label: i.name,
                        }))}
                    ></Select>
                }
                action={
                    <Button
                        disabled={!applicationId}
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={() => {
                            history.push(`/translates/${applicationId}/add`);
                        }}
                    >
                        {t('button.add')}
                    </Button>
                }
            >
                <Grid container justifyContent="flex-end" spacing={2}>
                    <Grid item xs={12}>
                        <SearchField
                            fullWidth
                            searchText={searchText}
                            setSearchText={setSearchText}
                            placeholder={t('input.searchplaceholder')}
                        />
                    </Grid>
                </Grid>
                {applicationId ? (
                    <>
                        <Tabs
                            value={tab}
                            onChange={(ev, value) => setTab(value)}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            classes={{ root: classes.tabsRoot }}
                        >
                            {tabs.map((i) => (
                                <Tab
                                    label={i.label}
                                    value={i.value}
                                    key={i.label}
                                />
                            ))}
                        </Tabs>
                        <TranslatesGrid
                            dense
                            data={data}
                            history={history}
                            onDelete={onDelete}
                            applicationData={applicationData}
                        />
                    </>
                ) : (
                    <PagePlaceholder>
                        {t('translates.placeholder_grid')}
                    </PagePlaceholder>
                )}
            </Pane>
        </>
    );
};

TranslatesManager.propTypes = {
    // : PropTypes.
    history: PropTypes.object,
};

export default TranslatesManager;

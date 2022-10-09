import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { PageSkeleton, Pane, SearchField } from 'components';
import {
    getApplicationsListRequest,
    getApplicationsListSelector,
    addApplicationRequest,
} from 'modules/applications';

//INFO - import delete hook from edit page
import { useDeleteApllication } from 'containers/ApplicationEdit/hooks';

import ApplicationsGrid from './components/ApplicationsGrid';
import AddApplicationPopup from './components/AddApplicationPopup';

const Applications = ({ history, setTitle, ...props }) => {
    const dispatch = useDispatch();
    const [showPopup, switchPopup] = React.useState(false);

    const { t } = useTranslation();

    setTitle(t('applications.title_applications'));
    React.useEffect(() => {
        dispatch(getApplicationsListRequest());
    }, []);

    const { onDelete } = useDeleteApllication({
        onSuccess: () => {
            dispatch(getApplicationsListRequest());
        },
    });

    const applications = useSelector(getApplicationsListSelector);

    const [searchText, setSearchText] = React.useState();

    const onCancel = () => {
        switchPopup(!showPopup);
    };

    const onSubmitPopup = (data) => {
        dispatch(
            addApplicationRequest(data, {
                onSuccess: () => {
                    dispatch(getApplicationsListRequest());
                    onCancel();
                },
            }),
        );
    };

    const [applicationName, setApplicationName] = React.useState('');

    const data = React.useMemo(() => {
        return searchText
            ? applications.filter((item) => {
                  return (
                      `${item.name} ${item.id}`
                          .toLowerCase()
                          .indexOf(searchText.toLowerCase()) !== -1
                  );
              })
            : applications;
    }, [searchText, applications]);

    const onEdit = (data) => {
        history.push(`/applications/${data.id}`);
    };
    const onAdd = (data) => {
        history.push(`/translates/${data.id}/add`);
    };

    console.log(applications);
    return (
        <>
            {showPopup ? (
                <AddApplicationPopup
                    t={t}
                    applicationName={applicationName}
                    onSubmit={onSubmitPopup}
                    onCancel={onCancel}
                />
            ) : null}
            <PageSkeleton>
                <Pane
                    title={t('applications.title_applications')}
                    action={
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                switchPopup(!showPopup);
                            }}
                        >
                            {t('applications.add_button')}
                        </Button>
                    }
                >
                    <Grid container>
                        <Grid item xs={6}>
                            <SearchField
                                setSearchText={setSearchText}
                                searchText={searchText}
                                placeholder={t(
                                    'applications.searchplaceholder',
                                )}
                            />
                        </Grid>
                    </Grid>
                    <ApplicationsGrid
                        data={data}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onAdd={onAdd}
                    />
                </Pane>
            </PageSkeleton>
        </>
    );
};

export default Applications;

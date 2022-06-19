import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Grid,
    TextField,
    InputAdornment,
    IconButton,
    Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';

import { PageSkeleton, Pane, LanguageSelect } from 'components';
import { showPopupAction } from 'modules/popups';
import {
    getApplicationsListRequest,
    getApplicationsListSelector,
    addApplicationRequest,
    deleteApplicationRequest,
} from 'modules/applications';

import ApplicationsGrid from './components/ApplicationsGrid';
import AddApplicationPopup from './components/AddApplicationPopup';

const Applications = ({ history, ...props }) => {
    const dispatch = useDispatch();
    const [showPopup, switchPopup] = React.useState(false);

    const { t } = useTranslation();
    React.useEffect(() => {
        dispatch(getApplicationsListRequest());
    }, []);
    const applications = useSelector(getApplicationsListSelector);
    console.log(applications);
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
    const onDelete = (data) => {
        dispatch(
            showPopupAction({
                // message: t('message.delete_application'),
                title: t('title.delete_application'),

                onClick: () => {
                    dispatch(
                        deleteApplicationRequest(
                            { applicationId: data.id },
                            {
                                onSuccess: () => {
                                    dispatch(getApplicationsListRequest());
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
                },
                cancelButtonProps: {},
            }),
        );
    };
    const onEdit = (data) => {
        setApplicationName(data.name);
        onCancel();
    };

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
            <PageSkeleton title={t('title.applications')}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Pane title={'applications.title.applications'}>
                            <Grid container spacing={6}>
                                <Grid item xs={10}>
                                    <TextField
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment
                                                    position="start"
                                                    color="primary"
                                                >
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                            endAdornment: searchText ? (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setSearchText('')
                                                        }
                                                        size="small"
                                                    >
                                                        <ClearIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ) : (
                                                false
                                            ),
                                        }}
                                        required
                                        value={searchText}
                                        onChange={(ev) =>
                                            setSearchText(ev.target.value)
                                        }
                                        variant="outlined"
                                        placeholder={t(
                                            'applications.input.searchplaceholder',
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={() => {
                                            switchPopup(!showPopup);
                                        }}
                                    >
                                        {t('button.add')}
                                    </Button>
                                </Grid>
                            </Grid>
                            <ApplicationsGrid
                                data={applications}
                                onDelete={onDelete}
                                onEdit={onEdit}
                            />
                        </Pane>
                    </Grid>
                </Grid>
            </PageSkeleton>
        </>
    );
};

export default Applications;

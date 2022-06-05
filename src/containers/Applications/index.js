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
import {
    getApplicationsListRequest,
    getApplicationsListSelector,
} from 'modules/applications';

import ApplicationsGrid from './components/ApplicationsGrid';

const Applications = ({ history, ...props }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    React.useEffect(() => {
        dispatch(getApplicationsListRequest());
    }, []);
    const applications = useSelector(getApplicationsListSelector);
    console.log(applications);
    const [searchText, setSearchText] = React.useState();

    return (
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
                                        history.push('/translates/add');
                                    }}
                                >
                                    {t('button.add')}
                                </Button>
                            </Grid>
                        </Grid>
                        <ApplicationsGrid data={applications} />
                    </Pane>
                </Grid>
            </Grid>
        </PageSkeleton>
    );
};

export default Applications;

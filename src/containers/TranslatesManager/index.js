import React from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import {
    PagePlaceholder,
    Pane,
    Select,
    SearchField,
    PageSkeleton,
} from 'components';

import TranslatesGrid from './components/TranslatesGrid';
import { useHook } from './hooks';

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
    const classes = useStyle();
    const {
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
        applicationIdFromUrl,
        setApplicationId,
        searchText,
        t,
    } = useHook({ history, pathname, classes });

    return (
        <PageSkeleton>
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
                            history.push(`/translations/${applicationId}/add`);
                        }}
                    >
                        {t('translations.add_button')}
                    </Button>
                }
            >
                <Grid container justifyContent="flex-end" spacing={2}>
                    <Grid item xs={8}>
                        <SearchField
                            fullWidth
                            searchText={searchText}
                            setSearchText={setSearchText}
                            placeholder={t('input.searchplaceholder')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Select
                            formControllProps={{
                                variant: 'filled',
                                fullWidth: true,
                            }}
                            defaultValue={allNameSpacesValue}
                            value={namespace}
                            onChange={(ev) => {
                                setNamespace(ev.target.value);
                            }}
                            items={namespaces}
                        ></Select>
                    </Grid>
                </Grid>
                {applicationId ? (
                    <>
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
                        {t('translations.placeholder_grid')}
                    </PagePlaceholder>
                )}
            </Pane>
        </PageSkeleton>
    );
};

TranslatesManager.propTypes = {
    // : PropTypes.
    history: PropTypes.object,
};

export default TranslatesManager;

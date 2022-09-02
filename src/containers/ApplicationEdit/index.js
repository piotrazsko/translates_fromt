/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

import Statistic from './components/Statistic';
import Export from './components/Export';
import ApplicationData from './components/ApplicationData';
import {
    PageSkeleton,
    EditPageSkeleton,
    GridGenerator,
    Cell,
    Pane,
} from 'components';

import {
    useHook,
    useDeleteApllication,
    useDownloadTranslates,
    useUploadTranslates,
} from './hooks';

import style from './style.scss';
import { push } from 'react-router-redux';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingBottom: '20px',
    },
}));

const ApplicationEdit = ({
    route,
    match: {
        params: { id, applicationId },
    },
    location,
    history,
    ...props
}) => {
    const classes = useStyles();

    const {
        handleSubmit,
        t,
        values,
        handleChange,
        errors,
        onCancel,
        onSaveToClipBoard,
        url,
        applicationData,
        applicationStatistics,
    } = useHook({
        id,
        location,
        history,
        classes,
        applicationId,
    });
    const { onDelete } = useDeleteApllication({
        onSuccess: () => {
            history.push('/applications');
        },
    });
    const { onDownload } = useDownloadTranslates({ applicationId: id });
    const { onUpload, inputFileRef } = useUploadTranslates({
        applicationId: id,
    });
    return (
        <PageSkeleton
            title={t('application.edit')}
            showButton
            buttonProps={{
                color: 'error',
                children: t('application.button_delete'),
                variant: 'outlined',
                onClick: () => onDelete({ id }),
            }}
        >
            <EditPageSkeleton onSave={handleSubmit} onCancel={onCancel}>
                <GridGenerator
                    cols={12}
                    rows={3}
                    // showGrid
                    cellProps={
                        {
                            // children: ({ col, row }) => <div></div>,
                        }
                    }
                    gap={[48, 24]}
                >
                    <Cell
                        col={0}
                        row={0}
                        colSpan={7}
                        rowSpan={2}
                        component={<Pane title={t('application.edit_block')} />}
                    >
                        <ApplicationData
                            t={t}
                            {...{
                                values,
                                handleChange,
                                errors,
                                onSaveToClipBoard,
                                url,
                                id,
                            }}
                        />
                    </Cell>
                    <Cell
                        col={7}
                        row={0}
                        colSpan={5}
                        rowSpan={2}
                        component={
                            <Pane
                                title={t('application.statistic_block')}
                                menuItems={[
                                    {
                                        title: t('dashboard.go_to_application'),
                                        onClick: () => {
                                            history.push(
                                                `/translates?applicationId="${id}"`,
                                            );
                                        },
                                    },
                                ]}
                            />
                        }
                    >
                        <Statistic
                            data={applicationData}
                            applicationStatistics={applicationStatistics}
                            t={t}
                        />
                    </Cell>
                    <Cell
                        col={0}
                        row={2}
                        colSpan={12}
                        rowSpan={1}
                        component={
                            <Pane title={t('application.export_block')} />
                        }
                    >
                        <Export
                            t={t}
                            inputFileRef={inputFileRef}
                            onDownload={onDownload}
                            onUpload={onUpload}
                        />
                    </Cell>
                </GridGenerator>
            </EditPageSkeleton>
        </PageSkeleton>
    );
};

ApplicationEdit.propTypes = {};

export default ApplicationEdit;

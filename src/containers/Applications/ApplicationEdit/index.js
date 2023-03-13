/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Statistic from './components/Statistic';
import Export from './components/Export';
import ApplicationData from './components/ApplicationData';
import { PageSkeleton, GridGenerator, Cell, Pane, Footer } from 'components';

import {
    useHook,
    useDeleteApllication,
    useDownloadTranslates,
    useUploadTranslates,
} from './hooks';

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
        onSuccess: onCancel,
    });
    const { onDownloadJSON, onDownloadXML } = useDownloadTranslates({
        applicationId: id,
    });
    const { onUpload, inputFileRef } = useUploadTranslates({
        applicationId: id,
    });
    return (
        <PageSkeleton
            footer={
                <Footer
                    onCancel={onCancel}
                    onDelete={onDelete}
                    onSubmit={handleSubmit}
                    deleteProps={{ children: t('applications.confirm_delete') }}
                    submitProps={{ children: t('applications.save_changes') }}
                />
            }
        >
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
                            action={
                                <Button
                                    onClick={() => {
                                        history.push(
                                            `/translations?applicationId="${id}"`,
                                        );
                                    }}
                                >
                                    See translations
                                </Button>
                            }
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
                    component={<Box></Box>}
                >
                    <Pane showHeader={false}>
                        <Export
                            t={t}
                            inputFileRef={inputFileRef}
                            onDownloadJSON={onDownloadJSON}
                            onDownloadXML={onDownloadXML}
                            onUpload={onUpload}
                        />
                    </Pane>
                </Cell>
            </GridGenerator>
        </PageSkeleton>
    );
};

ApplicationEdit.propTypes = {};

export default ApplicationEdit;

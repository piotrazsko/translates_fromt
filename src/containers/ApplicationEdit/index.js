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

import { useHook } from './hooks';

import style from './style.scss';

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
    } = useHook({
        id,
        location,
        history,
        classes,
        applicationId,
    });

    return (
        <PageSkeleton
            title={t('application.edit')}
            showButton
            buttonProps={{
                color: 'error',
                children: 'test',
                variant: 'outlined',
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
                            <Pane title={t('application.statistic_block')} />
                        }
                    >
                        <Statistic data={applicationData} t={t} />
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
                        <Export t={t} />
                    </Cell>
                </GridGenerator>
            </EditPageSkeleton>
        </PageSkeleton>
    );
};

ApplicationEdit.propTypes = {};

export default ApplicationEdit;

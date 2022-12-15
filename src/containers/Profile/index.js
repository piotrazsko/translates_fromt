/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { PageSkeleton, GridGenerator, Cell, Pane, Footer } from 'components';

import { PersonalData } from './components/PersonalData';
import { Language } from './components/Language';
import { Plan } from './components/Plan';
import { useHooks } from './hooks';

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
    setTitle,
    ...props
}) => {
    const classes = useStyles();
    const {
        handleChange,
        touched,
        values,
        handleSubmit,
        setErrors,
        errors,
        languages,
        currentLang,
        currentUser,
        t,
        onCancel,
        onDeleteAccount,
    } = useHooks({ history });

    setTitle(t('profile.title'));

    return (
        <PageSkeleton
            footer={
                <Footer
                    onCancel={onCancel}
                    onDelete={onDeleteAccount}
                    onSubmit={handleSubmit}
                    deleteProps={{ children: t('profile.confirm_delete') }}
                    submitProps={{ children: t('profile.save_changes') }}
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
                    colSpan={6}
                    rowSpan={2}
                    component={
                        <Pane title={t('profile.address')} showHeader={false} />
                    }
                >
                    <PersonalData
                        t={t}
                        {...{ touched, values, errors }}
                        handleChange={handleChange}
                    />
                </Cell>
                <Cell
                    col={6}
                    row={0}
                    colSpan={7}
                    rowSpan={2}
                    component={<Pane title={t('profile.language')} />}
                >
                    <Language
                        t={t}
                        handleChange={handleChange}
                        languages={languages}
                        currentLang={currentLang}
                    />
                </Cell>
                <Cell
                    col={0}
                    row={2}
                    colSpan={13}
                    rowSpan={1}
                    component={<Box />}
                >
                    <Pane showHeader={false}>
                        <Plan t={t} />
                    </Pane>
                </Cell>
            </GridGenerator>
        </PageSkeleton>
    );
};

ApplicationEdit.propTypes = {};

export default ApplicationEdit;

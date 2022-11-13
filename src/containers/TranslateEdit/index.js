/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import get from 'lodash/get';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

import {
    PageSkeleton,
    LangAutocompleate,
    Footer,
    Pane,
    GridGenerator,
    Cell,
    IconButton,
} from 'components';
import { DeleteIcon } from 'assets/images/icons';

import MissingLanguages from './components/MissingLanguages';
import { useHook } from './hooks';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingBottom: '20px',
    },
    missingOption: {
        fontSize: '12px',
    },
    headerLabels: {
        fontSize: '12px',
        position: 'sticky',
        top: '0px',
        boxSizing: 'border-box',
        zIndex: 3,
        paddingTop: 10,
        background: theme.palette.common.white,
    },
    textArea: {
        padding: '4px 12px !important',
    },
    content: {
        overflow: 'auto',
        maxHeight: 'calc(100vh - 280px)',
        paddingTop: 0,
    },
    addButtonCell: { position: 'sticky', bottom: '0px' },
    fixedPositionCells: {
        position: 'sticky',
        top: '36px',
    },
    paneContainer: {
        paddingBottom: '30px',
    },
    gridGenerator: {},
}));

const EditTranslate = ({
    route,
    match: {
        params: { id, applicationId },
    },
    location,
    setTitle,
    history,
    ...props
}) => {
    const classes = useStyles();
    const {
        handleSubmit,
        t,
        handleChange,
        values,
        errors,
        onGetReccomendedTranslation,
        onDelete,
        key,
        namespace,
        onAdd,
        missingLanguages,
        onChangeLanguage,
        translatesOnServer,
        existLangs,
        applicationData,
    } = useHook({ id, location, history, classes, applicationId });
    console.log(applicationData);
    setTitle(
        `${t('translation.title')}: ${applicationData.name || applicationId}`,
    );
    const translationsCount = get(values, 'translations.length', 1);

    return (
        <PageSkeleton
            footer={
                <Footer
                    deleteProps={{
                        children: t('translation.delete_translations'),
                    }}
                    cancelProps={{
                        children: t('translation.cancel'),
                    }}
                    submitProps={{
                        children: t('translation.save_translations'),
                    }}
                    onDelete={onDelete}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        history.goBack();
                    }}
                />
            }
        >
            <Pane
                classes={{
                    content: classes.content,
                    container: classes.paneContainer,
                }}
                showHeader
                action={
                    <MissingLanguages
                        t={t}
                        missingLanguages={missingLanguages}
                    />
                }
            >
                <GridGenerator
                    cols={12}
                    rows={translationsCount}
                    style={{
                        'grid-template-rows': `auto`,
                        'grid-auto-rows': 'auto',
                    }}
                    cellProps={
                        {
                            // children: ({ col, row }) => <div></div>,
                        }
                    }
                    gap={[4, 6]}
                >
                    <Cell
                        col={0}
                        row={0}
                        colSpan={2}
                        rowSpan={1}
                        className={classes.headerLabels}
                        component={<Box></Box>}
                    >
                        {t('translation.key')}
                    </Cell>
                    <Cell
                        col={2}
                        row={0}
                        colSpan={2}
                        rowSpan={1}
                        className={classes.headerLabels}
                        component={<Box></Box>}
                    >
                        {t('translation.language')}
                    </Cell>
                    <Cell
                        col={4}
                        row={0}
                        colSpan={3}
                        rowSpan={1}
                        className={classes.headerLabels}
                        component={<Box></Box>}
                    >
                        {t('translation.language')}
                    </Cell>
                    <Cell
                        col={7}
                        row={0}
                        colSpan={5}
                        rowSpan={1}
                        className={classes.headerLabels}
                        component={<Box></Box>}
                    >
                        {t('translation.value')}
                    </Cell>

                    <Cell
                        col={0}
                        row={1}
                        colSpan={2}
                        className={classes.fixedPositionCells}
                        rowSpan={1}
                        component={<Box></Box>}
                    >
                        <TextField
                            fullWidth
                            disabled={id === 'edit'}
                            variant="filled"
                            required
                            name="key"
                            size="medium"
                            id="outlined-error"
                            onChange={handleChange('key')}
                            value={values.key}
                            error={Boolean(errors.key)}
                            helperText={errors.key}
                        />
                    </Cell>
                    <Cell
                        col={2}
                        row={1}
                        className={classes.fixedPositionCells}
                        colSpan={2}
                        rowSpan={1}
                        component={<Box></Box>}
                    >
                        <TextField
                            fullWidth
                            disabled={id === 'edit'}
                            variant="filled"
                            size="medium"
                            name="namespace"
                            onChange={handleChange('namespace')}
                            value={values.namespace}
                            error={Boolean(errors.namespace)}
                            helperText={errors.namespace}
                        />
                    </Cell>

                    {values.translations.map((i, index) => {
                        return (
                            <>
                                <Cell
                                    col={4}
                                    row={index + 1}
                                    colSpan={3}
                                    rowSpan={1}
                                    component={<Box></Box>}
                                >
                                    <LangAutocompleate
                                        fullWidth
                                        name="language"
                                        variant="filled"
                                        optionsExtraData={
                                            <Typography
                                                className={
                                                    classes.missingOption
                                                }
                                            >
                                                {t(
                                                    'translation.missing_translate',
                                                )}
                                            </Typography>
                                        }
                                        disabledOptions={existLangs}
                                        disabled={translatesOnServer.includes(
                                            i.language,
                                        )}
                                        value={get(
                                            values,
                                            `translations.${index}.language`,
                                            null,
                                        )}
                                        error={Boolean(
                                            get(
                                                errors,
                                                `translations.${index}.language`,
                                                null,
                                            ),
                                        )}
                                        helperText={get(
                                            errors,
                                            `translations.${index}.language`,
                                            null,
                                        )}
                                        size="small"
                                        extraOptions={[
                                            ...missingLanguages.map((i) => ({
                                                id: i,
                                                label: i,
                                                isExtra: true,
                                            })),
                                        ]}
                                        onChange={onChangeLanguage(index)}
                                    />
                                </Cell>
                                <Cell
                                    col={7}
                                    row={index + 1}
                                    colSpan={4}
                                    rowSpan={1}
                                    component={<Box></Box>}
                                >
                                    <TextField
                                        fullWidth
                                        multiline
                                        variant="filled"
                                        name="value"
                                        maxRows={4}
                                        inputProps={{ id: i.id || i.language }}
                                        onChange={handleChange(
                                            `translations.${index}.value`,
                                        )}
                                        value={get(
                                            values,
                                            `translations.${index}.value`,
                                            null,
                                        )}
                                        error={Boolean(
                                            get(
                                                errors,
                                                `translations.${index}.value`,
                                                null,
                                            ),
                                        )}
                                        helperText={get(
                                            errors,
                                            `translations.${index}.value`,
                                            null,
                                        )}
                                    />
                                </Cell>
                                <Cell
                                    col={11}
                                    row={index + 1}
                                    colSpan={1}
                                    rowSpan={1}
                                    component={<Box></Box>}
                                >
                                    <IconButton
                                        tabIndex={-1}
                                        color="error"
                                        onClick={() =>
                                            onDelete(
                                                index,
                                                {
                                                    language: get(
                                                        values,
                                                        `translations.${index}.language`,
                                                        null,
                                                    ),
                                                    key,
                                                    namespace,
                                                    value: get(
                                                        values,
                                                        `translations.${index}.value`,
                                                        null,
                                                    ),
                                                },
                                                {
                                                    values,
                                                    translatesOnServer,
                                                },
                                            )
                                        }
                                        size="large"
                                    >
                                        <DeleteIcon height={13} />
                                    </IconButton>
                                </Cell>
                            </>
                        );
                    })}
                    <Cell
                        col={12}
                        row={translationsCount}
                        colSpan={1}
                        rowSpan={1}
                        className={classes.addButtonCell}
                        component={<Box></Box>}
                    >
                        <IconButton
                            color="primary"
                            onClick={(data) => onAdd(data, values)}
                        >
                            <Add />
                        </IconButton>
                    </Cell>
                </GridGenerator>
            </Pane>
        </PageSkeleton>
    );
};

EditTranslate.propTypes = {};

export default EditTranslate;

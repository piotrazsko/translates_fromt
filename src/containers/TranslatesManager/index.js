import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Pane, TranslatesGrid } from 'components';

import {
    getTranslatedListRequest,
    getTranslatedListSelector,
    deleteTranslateByKeyRequest,
} from 'modules/translates';
import { showPopupAction } from 'modules/popups';
const useStyle = makeStyles((theme) => ({
    buttonRoot: {
        marginLeft: '10px !important',
    },
    tabsRoot: { margin: '20px 0' },
}));
const TranslatesManager = ({ history, ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = useStyle();
    const res = useSelector(getTranslatedListSelector);

    React.useEffect(() => {
        dispatch(getTranslatedListRequest({}));
    }, []);

    const [tab, setTab] = React.useState(null);
    const [searchText, setSearchText] = React.useState();

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
        return (searchText
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

    const onDelete = React.useCallback(({ apiKey, key, namespace }) => {
        dispatch(
            showPopupAction({
                message: t('message.delete_translate'),
                title: t('message.delete_translate'),

                onClick: () => {
                    dispatch(
                        deleteTranslateByKeyRequest(
                            { key, namespace },
                            {
                                onSuccess: () => {
                                    dispatch(getTranslatedListRequest({}));
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
                    color: 'secondary',
                    classes: { root: classes.root },
                    style: { marginLeft: '10px' },
                },
                cancelButtonProps: {},
            }),
        );
    }, []);
    const [dense, setDense] = React.useState(true);
    return (
        <>
            <Pane title={t('title.translates')} grey>
                <Grid container justifyContent="flex-end" spacing={2}>
                    <Grid item xs={9}>
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
                                            onClick={() => setSearchText('')}
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
                            onChange={(ev) => setSearchText(ev.target.value)}
                            size="small"
                            variant="outlined"
                            placeholder={t('input.searchplaceholder')}
                        />
                    </Grid>
                    <Grid item xs={1}>
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
                    <Grid item xs={2}>
                        <FormControlLabel
                            control={
                                <Switch
                                    color="primary"
                                    checked={dense}
                                    onChange={() => {
                                        setDense(!dense);
                                    }}
                                />
                            }
                            label="Dense padding"
                        />
                    </Grid>
                </Grid>
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
                        <Tab label={i.label} value={i.value} />
                    ))}
                </Tabs>
                <TranslatesGrid
                    dense={dense}
                    data={data}
                    history={history}
                    onDelete={onDelete}
                />
            </Pane>
        </>
    );
};

TranslatesManager.propTypes = {
    // : PropTypes.
    history: PropTypes.object,
};

export default TranslatesManager;

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { PageSkeleton, Pane } from 'components';
import TranslatesGrid from './components/TranslatesGrid';

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
                    color: 'error',
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
            <PageSkeleton title={t('title.translates')} grey>
                <Pane>
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
                            <Tab
                                label={i.label}
                                value={i.value}
                                key={i.label}
                            />
                        ))}
                    </Tabs>
                    <TranslatesGrid
                        dense={dense}
                        data={data}
                        history={history}
                        onDelete={onDelete}
                    />
                </Pane>
            </PageSkeleton>
        </>
    );
};

TranslatesManager.propTypes = {
    // : PropTypes.
    history: PropTypes.object,
};

export default TranslatesManager;

import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    // appBar: {
    //     width: `calc(100% - ${drawerWidth}px)`,
    //     marginLeft: drawerWidth,
    // },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        background: theme.palette.primary.main,
        width: drawerWidth,
        borderRadius: 0,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    text: {
        color: '#fff',
    },
    icon: {
        color: '#fff',
    },
}));

const getSideBarItems = (t, history) => [
    {
        title: t('sidebar.translations'),
        onClick: () => {
            history.push('/translates');
        },
    },
    {
        title: t('sidebar.billing'),
        onClick: () => {
            history.push('/billing');
        },
    },
    {
        title: t('sidebar.api'),
        onClick: () => {
            history.push('/api');
        },
    },
    {
        title: t('sidebar.docs'),
        onClick: () => {
            history.push('/docs');
        },
    },
    {
        title: t('sidebar.settings'),
        onClick: () => {
            history.push('/settings');
        },
    },
];

export default function PermanentDrawerLeft({ history, ...props }) {
    const classes = useStyles();
    const { t } = useTranslation();

    const items = React.useMemo(() => {
        return getSideBarItems(t, history);
    }, [history, t]);

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.toolbar} />
            <List>
                {items.map((i, index) => (
                    <ListItem button key={i.title} onClick={i.onClick}>
                        <ListItemIcon classes={{ root: classes.text }}>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText
                            classes={{ primary: classes.text }}
                            primary={i.title}
                        />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

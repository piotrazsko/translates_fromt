import { createTheme } from '@mui/material/styles';

const main = '#0069ff';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: main,
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1400,
            xl: 1820,
        },
    },
    typography: {
        body1: {
            'font-size': '18px',
            color: '#4c4c4c',
            // 'line-height': '1.9',
        },
        body2: {
            'font-size': '18px',
            color: 'red',
            // border: '2px solid #ccc',
            // padding: '3px 6px',
            fontWeight: '400',
            cursor: 'pointer',
            // 'line-height': '28px',
        },
    },
    overrides: {
        MuiTab: {
            root: {
                padding: '0px 10px',
                minWidth: '0px !important',
                color: '#000',
            },
            textColorPrimary: {
                color: '#000',
                fontSize: '14px',
                fontWeight: 'bold',
            },
        },
        MuiDrawer: {
            paper: { zIndex: 2 },
        },
        MuiButton: {
            root: {
                textTransform: 'capitalize',
                // borderRadius: "50px",
                height: '37px',
            },

            contained: {
                boxShadow: 'none',
            },
            label: { fontSize: '14px' },
        },
        MuiPaper: {
            root: {
                borderRadius: '6px',
                minHeight: '20px',
            },
            rounded: {
                borderRadius: '6px',
            },
            elevation1: {
                boxShadow: '0px 2px 92px 0px rgba(0, 0, 0, 0.07)',
            },
        },
        PrivateTabIndicator: {
            root: {
                display: 'none',
            },
        },
    },
});

import { createTheme, responsiveFontSizes } from '@mui/material';

// colors
const primary = '#6160DC';
const secondary = '#54C5EB';
const black = '#22242C';
const darkBlack = 'rgb(36, 40, 44)';
const background = '#f5f5f5';
const grey = '';
const warningMain = '#FF4A55';
// const warningDark = 'rgba(253, 200, 69, .7)';

// border
const borderWidth = 2;
const borderColor = 'rgba(0, 0, 0, 0.13)';

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

// spacing
const spacing = 8;

export const theme = createTheme({
    palette: {
        type: 'light',
        primary: { main: primary },
        secondary: { main: secondary },
        common: {
            black,
            darkBlack,
        },
        warning: {
            // light: warningLight,
            main: warningMain,
            // dark: warningDark,
        },
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
        background: {
            default: background,
        },
        spacing,
    },
    breakpoints: {
        // Define custom breakpoint values.
        // These will apply to Material-UI components that use responsive
        // breakpoints, such as `Grid` and `Hidden`. You can also use the
        // theme breakpoint functions `up`, `down`, and `between` to create
        // media queries for these breakpoints
        values: {
            xl,
            lg,
            md,
            sm,
            xs,
        },
    },
    border: {
        borderColor: borderColor,
        borderWidth: borderWidth,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    'box-shadow': '0px 20px 50px rgba(191, 21, 108, 0.05)',
                    minWidth: '80px',
                },
                sizeMedium: {
                    height: 40,
                },
            },
        },
        MuiTextField: {
            defaultProps: { size: 'small' },
        },
        MuiSelect: {
            defaultProps: { size: 'small' },
        },
        MuiInput: {
            defaultProps: { size: 'small' },
            styleOverrides: {},
        },
        MuiInputBase: {
            styleOverrides: {
                root: { backgroundColor: '#FAFAFA;', minWidth: '80px' },

                sizeSmall: {
                    height: 36,
                    minHeight: 36,
                    fontSize: '14px',
                },
                sizeMedium: {
                    minHeight: 44,
                },
                sizeLarge: {
                    minHeight: 48,
                },
                inputMultiline: {
                    height: 80,
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                input: {
                    padding: '0.5px 4px 7.5px 6px !important',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&[data-shrink="false"]': {
                        transform: 'translate(14px, 9px) scale(1)',
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    // borderWidth: '1px !important',
                },
                notchedOutline: {
                    borderWidth: '1px !important',
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    backgroundColor: '#FAFAFA',
                    '&::before': {
                        borderBottom: 'none !important',
                    },
                    '&::after': {
                        borderBottom: 'none !important',
                    },
                    '&:hover': {
                        border: '1px solid #7675ED',
                    },
                    // borderWidth: '1px !important',
                    '&.Mui-disabled': {
                        backgroundColor: '#FAFAFA',
                        color: '#BFBFBF',
                    },

                    // underline: {
                    // borderBottom: 'none !important',
                    // },
                },
                input: {
                    paddingTop: '4px',
                    paddingLeft: '16px',
                },
                notchedOutline: {
                    borderWidth: '1px !important',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    padding: '20px 30px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.03);',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                h1: { fontWeight: 600, fontSize: '30px' },
                h2: { fontWeight: 700, fontSize: '24px' },
                h3: { fontWeight: 700, fontSize: '22px' },
                h4: { fontWeight: 700, fontSize: '16px' },
                h5: { fontWeight: 700, fontSize: '14px' },
                body1: { fontWeight: 500, fontSize: '18px' },
                body2: { fontWeight: 500, fontSize: '14px' },
                subtitle1: {
                    fontSize: '16px',
                    color: '#BFBFBF',
                },
            },
        },
    },

    typography: {
        useNextVariants: true,
    },
});

// export default responsiveFontSizes(theme);

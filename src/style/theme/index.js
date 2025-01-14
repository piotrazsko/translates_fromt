import { createTheme, responsiveFontSizes } from '@mui/material';

// colors
const primary = '#7675ED';
const secondary = '#454545';
const black = '#22242C';
const darkBlack = 'rgb(36, 40, 44)';
const background = '#f5f5f5';
const warningMain = '#FF4A55';
const white = '#ffffff';
const filledColor = '#FAFAFA';

const subtitleColor = '#BFBFBF';
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
            white,
        },
        warning: {
            main: warningMain,
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
            xs,
            sm,
            md,
            lg,
            xl,
        },
    },
    border: {
        borderColor: borderColor,
        borderWidth: borderWidth,
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: filledColor,
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                sizeSmall: {
                    padding: 7,
                },
            },
        },
        MuiButton: {
            // defaultProps: { size: 'small' },
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    'box-shadow': '0px 20px 50px rgba(191, 21, 108, 0.05)',
                    minWidth: '80px',
                    textTransform: 'none',
                    fontSize: '14px',
                    padding: '6px 6px',
                    whiteSpace: 'nowrap',
                },
                sizeMedium: {
                    height: 36,
                    minWidth: 146,
                },
                sizeSmall: {
                    height: 32,
                    padding: '6px 20px',
                },
            },
        },
        MuiTextField: {
            // defaultProps: { size: 'small' },
        },
        MuiSelect: {
            // defaultProps: { size: 'small' },
        },
        MuiInput: {
            defaultProps: { size: 'small' },
            styleOverrides: {},
        },
        MuiInputBase: {
            defaultProps: { size: 'medium' },
            styleOverrides: {
                root: {
                    backgroundColor: filledColor,
                    minWidth: '80px',
                    minHeight: 36,
                    '&.MuiInputBase-multiline': {
                        padding: 0,
                    },
                },
                input: {
                    padding: '3px 16px',
                },

                sizeSmall: {
                    height: 32,
                    minHeight: 32,
                    fontSize: '14px',
                },
                sizeMedium: {
                    height: 36,
                    fontSize: '14px',
                    minHeight: 36,
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
                root: {
                    '& .MuiFilledInput-root': {
                        paddingTop: 4,
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    position: 'relative',
                    fontSize: 12,
                    fontWeight: 500,
                    '&[data-shrink="false"]': {
                        transform: 'translate(0px, -6px) scale(1)',
                    },
                    '&[data-shrink="true"]': {
                        transform: 'translate(0px, -6px) scale(1)',
                    },
                    color: secondary,
                    '&.Mui-disabled': {
                        color: secondary,
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
                input: {
                    padding: '3px 16px',
                },
                notchedOutline: {
                    borderWidth: '1px !important',
                },
            },
        },
        MuiInputAdornment: {
            styleOverrides: {
                root: { marginTop: '0px !important' },
            },
        },

        MuiFilledInput: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    backgroundColor: filledColor,
                    border: '1px solid transparent',
                    '&::before': {
                        borderBottom: 'none !important',
                    },
                    '&::after': {
                        borderBottom: 'none !important',
                    },
                    '&:hover': {
                        border: '1px solid',
                        borderColor: primary,
                    },
                    // borderWidth: '1px !important',
                    '&.Mui-disabled': {
                        backgroundColor: filledColor,
                        color: '#BFBFBF',
                    },
                },
                input: {
                    paddingTop: '4px',
                    paddingLeft: '16px',
                    paddingBottom: 3,
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
        MuiCardHeader: {
            styleOverrides: {
                action: {
                    marginTop: 0,
                    marginRight: 0,
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
                    color: subtitleColor,
                },
            },
        },
    },

    typography: {
        useNextVariants: true,
    },
});

// export default responsiveFontSizes(theme);

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
                    borderRadius: '40px',
                    'box-shadow': '0px 20px 50px rgba(191, 21, 108, 0.05)',
                    minWidth: '80px',
                },
                sizeMedium: {
                    height: 40,
                },
            },
        },
        MuiInputBase: {
            defaultProps: { size: 'medium' },
            styleOverrides: {
                root: {
                    height: 40,
                },
                sizeSmall: {
                    height: 32,
                },
                sizeMedium: {
                    height: 40,
                },
                sizeLarge: {
                    height: 48,
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
                    borderRadius: '40px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '40px',
                    padding: '32px',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                h1: { fontWeight: 700, fontSize: '36px' },
                h2: { fontWeight: 700, fontSize: '24px' },
                h3: { fontWeight: 700, fontSize: '22px' },
                h4: { fontWeight: 700, fontSize: '16px' },
                h5: { fontWeight: 700, fontSize: '14px' },
                body1: { fontWeight: 500, fontSize: '18px' },
                body2: { fontWeight: 500, fontSize: '14px' },
                subtitle1: { fontSize: '24px', color: '#8E8EA1' },
            },
        },
    },

    typography: {
        useNextVariants: true,
    },
});

// export default responsiveFontSizes(theme);

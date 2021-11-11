import { createTheme } from "@material-ui/core/styles";

const main = "#ffb500";
// const main = "#70c700";
// const main = "#ff0000";
// const main = "#ffde00";
// const main = "#0069ff";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: main,
    },
    secondary: {
      main: "#000",
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
    fontSize: 18,
    fontWeight: 500,
    fontFamily: "Roboto",
    fontColor: "#333",
    h2: {
      fontSize: "26px",
      fontWeight: "600",
      borderBottom: `7px solid ${main}`,
      display: "inline",
      boxSizing: "border-box",
      padding: "0",
    },
    h3: { fontSize: "24px", fontWeight: "bold", textTransform: "uppercase" },
    h4: { fontSize: "22px", fontWeight: "500", color: "#000" },
    h5: { fontSize: "18px", fontWeight: "500" },
    body1: {
      "font-size": "18px",
      color: "#4c4c4c",
      "line-height": "1.7",
    },
    body2: {
      "font-size": "16px",
      color: "#989898",
      fontWeight: "400",
      "line-height": "22px",
    },
    subtitle1: {
      fontSize: "16px",
      color: "#777",
    },
    subtitle2: {
      fontSize: "16px",
      color: "#000",
      fontWeight: "400",
    },
  },
  overrides: {
    MuiTab: {
      root: {
        padding: "0px 10px",
        minWidth: "0px !important",
        color: "#000",
      },
      textColorPrimary: {
        color: "#000",
        fontSize: "14px",
        fontWeight: "bold",
      },
      // wrapper: {
      //   // color: "#000",
      // },
    },
    MuiButton: {
      root: {
        textTransform: "capitalize",
        borderRadius: "50px",
        height: "37px",
      },

      contained: {
        boxShadow: "none",
      },
      label: { fontSize: "14px" },
    },
    MuiPaper: {
      root: {
        borderRadius: "6px",
        minHeight: "20px",
      },
      rounded: {
        borderRadius: "6px",
      },
      elevation1: {
        boxShadow: "0px 2px 92px 0px rgba(0, 0, 0, 0.07)",
      },
    },
    PrivateTabIndicator: {
      root: {
        display: "none",
      },
    },
  },
});

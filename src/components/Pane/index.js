import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: "30px 30px 45px 30px",
  },
  grey: {
    background: "#fafafa",
  },
  content: {
    margin: "30px 0 0 0 !important",
    whiteSpace: "pre-wrap",
  },
}));

const Pane = ({ title, children, verticalOffset = 0, grey = false }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      classes={{ root: classes.container }}
      className={grey ? classes.grey : ""}
      // style={{ marginTop: "20px" }}
    >
      <Grid item xs={12}>
        <Typography variant="h2">{title}</Typography>
      </Grid>
      <Grid
        classes={{
          item: classes.content,
        }}
        style={{ paddingTop: `${verticalOffset}px` }}
        item
        xs={12}
      >
        {children}
      </Grid>
    </Grid>
  );
};

Pane.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  grey: PropTypes.bool,
};

export default Pane;

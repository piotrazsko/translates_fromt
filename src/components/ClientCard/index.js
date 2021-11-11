import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20px",
    boxShadow: "0px 0px 48px 0px rgba(4, 6, 4, 0.08)",
    minHeight: "180px",
    minWidth: "190px",
    height: "100%",
  },

  icon: { width: "45px !important", height: "45px" },
  title: { marginTop: "-25px", textAlign: "center", fontSize: "14px" },
  content: { marginTop: "10px", fontSize: "13px" },
  image: { width: "110px" },
  imageContainer: { height: "100%", padding: "20px" },
}));
// or

const ClientCard = ({ image, title, children }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Grid
        container
        className={classes.imageContainer}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <picture>
            <img
              intrinsicsize
              className={classes.image}
              src={image}
              alt="client icon"
            />
          </picture>
        </Grid>
      </Grid>
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body2" className={classes.content}>
        {children}
      </Typography>
    </Paper>
  );
};

ClientCard.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  children: PropTypes.string,
};

export default ClientCard;

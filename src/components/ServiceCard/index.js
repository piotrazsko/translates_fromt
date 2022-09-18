import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20px",
    boxShadow: "0px 0px 48px 0px rgba(4, 6, 4, 0.08)",
    minHeight: "186px",
  },
  icon: { width: "45px !important", height: "45px" },
  title: { marginTop: "10px" },
  content: { marginTop: "10px" },
}));
// or

const ServiceCard = ({ icon, title, children }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      {icon ? <FontAwesomeIcon className={classes.icon} icon={icon} /> : null}
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body2" className={classes.content}>
        {children}
      </Typography>
    </Paper>
  );
};

ServiceCard.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  children: PropTypes.string,
};

export default ServiceCard;

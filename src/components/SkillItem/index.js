import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  title: {},
  line: {
    margin: "10px 0 20px",
    height: "5px",
    background: "#dfdfdf",
    borderRadius: "50px",
  },
  selectedLine: {
    borderRadius: "50px",
    height: "5px",
    background: theme.palette.primary.main,
  },
}));

const SkillItem = ({ title, percent = 100 }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <Typography variant="h5">{title}</Typography>
        <div className={classes.line}>
          <div
            className={classes.selectedLine}
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

SkillItem.propTypes = {
  title: PropTypes.string,
  percent: PropTypes.number,
};

export default SkillItem;

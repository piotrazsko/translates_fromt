import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./style";

const List = ({ items, showDates = true, title }) => {
  const classes = useStyles();
  return (
    <ul className={classes.ul}>
      <li className={[classes.li, classes.firstLi].join(" ")}>
        <Typography variant="h2" classes={{ root: classes.root }}>
          {title}
        </Typography>
      </li>
      {items.map((i, index) => (
        <li
          className={[
            classes.li,
            index === items.length - 1 ? classes.lastLi : "",
          ].join(" ")}
          key={index}
        >
          {showDates ? (
            <Typography variant="h4">{i.title}</Typography>
          ) : (
            <span className={classes.title}>{i.title}</span>
          )}
          {showDates ? <p className={classes.dates}>{i.dates}</p> : null}
          {i.text ? <span className={classes.content}>{i.text}</span> : null}
          {i.link ? (
            <a className={classes.content} href={i.link.value}>
              {i.link.label}
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  items: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    dates: PropTypes.string,
  }).isRequired,
  titls: PropTypes.string,
  showDates: PropTypes.bool,
};

export default List;

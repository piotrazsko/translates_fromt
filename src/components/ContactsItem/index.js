import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  link: { textDecoration: "none" },
  container: { display: "flex" },
  title: { marginRight: "5px" },
}));

const ContactsItem = ({ item }) => {
  const classes = useStyles();
  const { value, text, type, title } = item;
  return (
    <div className={classes.container}>
      <Typography variant="subtitle2" classes={{ root: classes.title }}>
        {title}:
      </Typography>
      {type === "link" ? (
        <a
          href={value}
          className={classes.link}
          target="_blank"
          rel="noreferrer"
        >
          <Typography component={"span"} variant="body1">
            {text}
          </Typography>
        </a>
      ) : (
        <Typography component={"span"} variant="body1">
          {text}
        </Typography>
      )}
    </div>
  );
};

ContactsItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }),
};

export default ContactsItem;

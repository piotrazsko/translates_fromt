import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

import { Pane } from "components";

import portfolio from "config/portfolio";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    // width: 500,
    // height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const Contacts = ({ viewPort: { isMobile }, ...props }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Pane title={t("portfolio")}>
            <ImageList
              cols={isMobile ? 2 : 4}
              rowHeight={180}
              className={classes.imageList}
            >
              {portfolio.map((item) => (
                <ImageListItem key={item.img}>
                  <img src={item.img} alt={item.title} />
                  <ImageListItemBar
                    title={item.title}
                    subtitle={<span>by: {item.author}</span>}
                    actionIcon={
                      <IconButton
                        aria-label={`info about ${item.title}`}
                        className={classes.icon}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Pane>
        </Grid>
      </Grid>
    </>
  );
};

Contacts.propTypes = {
  viewPort: PropTypes.shape({ isMobile: PropTypes.bool }),
  // : PropTypes.
};

export default Contacts;

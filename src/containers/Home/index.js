import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { faLaptopCode, faMobile } from "@fortawesome/free-solid-svg-icons";
import { faNodeJs, faApple } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";
import { Pane, ServiceCard, SkillItem, ClientCard } from "components";

import { clients } from "config/clients.js";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Home = ({ ...props }) => {
  const { t } = useTranslation();

  return (
    <>
      <Pane title={t("about_me")}>
        <Typography variant="body1">{t("user_about_me")}</Typography>
      </Pane>
    </>
  );
};

Home.propTypes = {
  // : PropTypes.
};

export default Home;

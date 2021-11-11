import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { faLaptopCode, faMobile } from "@fortawesome/free-solid-svg-icons";
import { faNodeJs, faApple } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";
import { Pane, ServiceCard, SkillItem, ClientCard, Profile } from "components";
import { Resume, Contacts } from "containers";
import { clients } from "config/clients.js";

const PDF = ({ ...props }) => {
  const { t } = useTranslation();
  const skills = [
    { title: "JavaScript", percent: 90 },
    { title: "React", percent: 85 },
    { title: "React Native", percent: 85 },
    { title: "Redux", percent: 90 },
    { title: "Redux-saga", percent: 90 },
    { title: "NextJs", percent: 90 },
    { title: "NodeJs", percent: 50 },
    { title: "Git", percent: 75 },
    { title: "Sass", percent: 85 },
    { title: "Less", percent: 85 },
    { title: "HTML", percent: 85 },
    { title: "CSS", percent: 85 },
  ];
  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <Profile />
        </Grid>
        <Grid item xs={8}>
          <Pane title={t("about_me")}>
            <Typography variant="body1">{t("user_about_me")}</Typography>
          </Pane>
          <Resume />
        </Grid>
      </Grid>
      <Pane title={t("skills")}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {skills
              .filter((i, index) => index % 2 === 0)
              .map((i) => (
                <SkillItem title={i.title} key={i.title} percent={i.percent} />
              ))}
          </Grid>
          <Grid item xs={6}>
            {skills
              .filter((i, index) => index % 2 === 1)
              .map((i) => (
                <SkillItem title={i.title} key={i.title} percent={i.percent} />
              ))}
          </Grid>
        </Grid>
      </Pane>
    </>
  );
};

PDF.propTypes = {
  // : PropTypes.
};

export default PDF;

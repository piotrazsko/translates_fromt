import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { faLaptopCode, faMobile } from "@fortawesome/free-solid-svg-icons";
import { faNodeJs, faApple } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";
import { Pane, ServiceCard, SkillItem, ClientCard } from "components";
import { Resume, Contacts } from "containers";
import { clients } from "config/clients.js";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Home = ({ ...props }) => {
  const matchesPrint = useMediaQuery("print");
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
      <Pane title={t("about_me")}>
        <Typography variant="body1">{t("user_about_me")}</Typography>
      </Pane>
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
      <Pane title={t("clients")}>
        <Grid container spacing={3}>
          {clients.map((i) => (
            <Grid item xs={6} lg={3} key={i.image}>
              <ClientCard image={i.image} title={i.title} />
            </Grid>
          ))}
        </Grid>
      </Pane>
      <Resume />
      <Pane title={t("my_services")}>
        <Grid container spacing={2} justifyContent="space-around">
          <Grid item xs={4}>
            <ServiceCard icon={faLaptopCode} title={t("web_development")}>
              {t("card_web_development")}
            </ServiceCard>
          </Grid>
          <Grid item xs={4}>
            <ServiceCard icon={faApple} title={t("mobile_development")}>
              {t("card_mobile_development")}
            </ServiceCard>
          </Grid>
          <Grid item xs={4}>
            <ServiceCard icon={faNodeJs} title={t("backend_development")}>
              {t("card_backend_development")}
            </ServiceCard>
          </Grid>
        </Grid>
      </Pane>
    </>
  );
};

Home.propTypes = {
  // : PropTypes.
};

export default Home;

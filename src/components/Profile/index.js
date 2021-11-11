import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import style from "./style.scss";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "../List";
import userImage from "assets/images/user_image.jpg";
import userImageWebp from "assets/images/user_image.webp";
import contacts from "../../config/contacts.json";

export const fetchApi = ({ url, headers, ...options }) => {
  return fetch(url, {
    method: "GET",
    headers: {
      "X-Api-App-Http-Host": "http://localhost:3000/",
      Accept: "application/json, text/plain, */*",
      // Authorization: `Bearer ${api_token()}`,
      ...headers,
    },
    responseType: "blob", // used for get files
    ...options,
  });
};

const Profile = ({ isPDF = true, ...props }) => {
  const { t } = useTranslation();
  const items = [
    { title: `${t("name")}:`, text: t("user_name") },
    { title: `${t("birthdate")}:`, text: t("user_birth_date") },
    { title: `${t("job")}:`, text: t("user_job") },
    { title: `${t("email")}:`, link: contacts.user_email },
    { title: `${t("linkedin")}:`, link: contacts.user_linkedin },
    { title: `${t("github")}:`, link: contacts.user_github },
    { title: `${t("stackoverflow")}:`, link: contacts.user_stackoverflow },
    { title: `${t("phone")}:`, link: contacts.user_phone },
    { title: `${t("address")}:`, text: t("user_address") },
  ];
  const [showLoader, swithcLoader] = React.useState(false);
  const downloadBlob = (blob, filename) => {
    swithcLoader(false);
    const url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  const onDownload = () => {
    swithcLoader(true);
    //   const onChangeState = (status) => {
    const ajaxOptions = {
      url:
        process.env.NODE_ENV == "development"
          ? "http://localhost:3001/pdf"
          : "https://api.goman.live/pdf",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf",
        Origin:
          process.env.NODE_ENV == "development"
            ? "http://localhost:3001"
            : "https://api.goman.live",
        "X-Api-App-Http-Host":
          process.env.NODE_ENV == "development"
            ? "http://localhost:3001"
            : "https://api.goman.live",
      },
      body:
        process.env.NODE_ENV == "development"
          ? JSON.stringify({ url: "http://localhost:3000/pdf" })
          : JSON.stringify({ url: "https://piotrazsko.github.io/pdf" }),
    };
    //   // TODO: need get  filename from  content-disposition
    fetchApi({
      ...ajaxOptions,
    }).then((data) => {
      data.blob().then((blob) => {
        downloadBlob(blob, `petrashka.siarhei.cv.pdf`);
      });
    });
  };

  return (
    <Paper className={style.profile}>
      <Box className={style.profileName}>
        <Typography variant="h3">{t("user_name")}</Typography>
        <Typography variant="subtitle1">{t("user_position")}</Typography>
      </Box>
      <Box component="figure" className={style.profileImageFigure}>
        <picture>
          <source srcset={userImageWebp} type="image/webp"></source>
          <source srcset={userImage} type="image/jpeg"></source>
          <img className={style.image} src={userImage} alt="user portrait" />
        </picture>
      </Box>
      <List showDates={false} items={items} />
      {!isPDF ? (
        <div className={style.buttonContainer}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            className={style.download}
            onClick={onDownload}
            loading
            loadingPosition="start"
            endIcon={
              showLoader ? (
                <CircularProgress size={23} color={"secondary"} />
              ) : null
            }
          >
            {t("button_download_cv")}
          </Button>
        </div>
      ) : null}
    </Paper>
  );
};

Profile.propTypes = {
  data: PropTypes.object,
};

export default Profile;

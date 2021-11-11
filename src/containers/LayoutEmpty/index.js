import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import { Helmet } from "react-helmet";
import MobileScreen from "../MobileScreen";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Profile, Header } from "components";
import { Home } from "containers";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "60px",
  },
}));

const LayoutEmpty = ({
  myPermissionsSelector,
  children,
  viewPort,
  userIsMaster,
  currentUserData,
  currentLocalization,
  ...rest
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { isMobile } = viewPort;

  const [isEndOfPage, setEndOfPage] = React.useState(false);
  const restWithPermissons = {
    viewPort,
    isEndOfPage,
    children,
    currentLocalization,
    ...rest,
  };
  return (
    <>
      <Helmet>
        <title>{t("user_name")}</title>
      </Helmet>
      {/* {!isMobile ? ( */}
      <Container maxWidth="lg" classes={{ root: classes.root }}>
        <Grid container spacing={2}>
          {restWithPermissons.route.showProfile ? (
            <Grid item md={3} lg={3}>
              <Profile isPDF={false} />
            </Grid>
          ) : (
            false
          )}
          <Grid
            item
            md={restWithPermissons.route.showProfile ? 9 : 12}
            lg={restWithPermissons.route.showProfile ? 9 : 12}
          >
            <Grid container>
              <Grid item xs={12}>
                <Paper>
                  {React.createElement(children, restWithPermissons)}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* ) : (
        <MobileScreen />
      )} */}
    </>
  );
};

LayoutEmpty.propTypes = {
  viewPort: PropTypes.shape({ isMobile: PropTypes.bool.isRequired }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.any,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  myPermissionsSelector: PropTypes.object,
  currentLocalization: PropTypes.string,
};

export default LayoutEmpty;

import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { Pane, ContactsItem, Map } from "components";
import { useTranslation } from "react-i18next";
const contacts = (t) => [
  { title: t("address"), text: t("user_address"), type: "text", value: null },
  {
    title: t("phone"),
    text: t("user_phone"),
    type: "link",
    value: `tel:${t("user_phone")}`,
  },
  {
    title: t("email"),
    text: t("user_email"),
    type: "link",
    value: `mailto:${t("email")}`,
  },
];

const mapData = {
  center: { lat: 53.85248, lng: 27.49221 },
  zoom: 13,
};

const Contacts = ({ viewPort: { isMobile }, ...props }) => {
  const { t } = useTranslation();
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Pane title={t("contact_information")}>
            {contacts(t).map((i) => (
              <ContactsItem key={i.title} item={i}></ContactsItem>
            ))}
          </Pane>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Pane title={t("contact_map")}>
            <Map data={mapData} />
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

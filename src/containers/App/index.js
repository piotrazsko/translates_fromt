import React, { Fragment } from "react";
import routes, { redirectAuthPath } from "routes";

import { Routing, Popups } from "containers";
import "modules/i18next";

import "../../style/style.common.scss";
import "../../assets/fonts/stylesheet.css";

const App = ({ ...props }) => {
  return (
    <Fragment>
      <Routing routes={routes} redirectUrl={redirectAuthPath} />
      <Popups />
    </Fragment>
  );
};

export default App;

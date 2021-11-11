import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Pane, TranslatesGrid } from "components";
import {
  getTranslatedListRequest,
  getTranslatedListSelector,
} from "modules/translates";

const TranslatesManager = ({ ...props }) => {
  const { t } = useTranslation();
  const [lang, setLang] = React.useState("en");
  const dispatch = useDispatch();
  const res = useSelector(getTranslatedListSelector);
  const data = React.useMemo(() => {
    const data = res[lang];

    const getLine = (data, namespace = null) => {
      let res = [];
      for (var variable in data) {
        if (data.hasOwnProperty(variable)) {
          if (typeof data[variable] === "object") {
            res = [...res, ...getLine(data[variable], variable || null)];
          } else {
            res.push({
              key: variable,
              namespace: namespace,
              value: data[variable],
            });
          }
        }
      }
      return res;
    };
    // const  keys =
    return getLine(data);
  }, [res]);

  console.log(data);

  React.useEffect(() => {
    dispatch(getTranslatedListRequest({ language: lang, apiKey: "test" }));
  }, [lang]);

  return (
    <>
      <Pane title={t("title.translates")}>
        <TranslatesGrid data={data} />
      </Pane>
    </>
  );
};

TranslatesManager.propTypes = {
  // : PropTypes.
};

export default TranslatesManager;

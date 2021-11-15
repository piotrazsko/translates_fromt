/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";

import { Pane } from "components";
import {
  getTranslatesByKeyRequest,
  getTranslatesByKeySelector,
} from "modules/translates";

const validationSchema = yup.object({
  key: yup.string().required(),
  translates: yup.array().of(
    yup.object().shape({
      language: yup.string().required(),
      value: yup.string().required(),
    })
  ),
});
const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: "20px",
  },
}));

const EditTranslate = ({ route, history, ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      getTranslatesByKeyRequest({
        key: "add",
        namespace: "button",
      })
    );
  }, []);
  const translateData = useSelector(getTranslatesByKeySelector);

  const {
    handleChange,
    handleBlur,
    handleReset,
    touched,
    values,
    handleSubmit,
    setFieldValue,
    errors,
    ...data
  } = useFormik({
    initialValues: {
      key: "",
      namespace: "",
      translates: [{ id: Math.random(), language: "", value: "" }],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  React.useEffect(() => {
    if (translateData.loaded) {
      for (const key in translateData) {
        if (
          Object.hasOwnProperty.call(translateData, key) &&
          key !== "loaded"
        ) {
          const element = translateData[key];
          setFieldValue(key, element);
        }
      }
    }
  }, [translateData]);

  const onAdd = React.useCallback(
    (data) => {
      setFieldValue("translates", [
        ...values.translates,
        { id: Math.random(), language: "", value: "" },
      ]);
    },
    [values.translates]
  );
  const onDelete = React.useCallback(
    (itemIndex) => {
      if (values.translates.length > 1) {
        setFieldValue("translates", [
          ...values.translates.filter((i, index) => index !== itemIndex),
        ]);
      }
    },
    [values.translates]
  );
  const classes = useStyles();
  return (
    <Pane title={t("title.edit")}>
      <form onSubmit={handleSubmit}>
        <Grid container classes={{ root: classes.container }} spacing={2}>
          <Grid item xs={2}>
            <TextField
              fullWidth
              placeholder={t("input.key")}
              label={t("input.key")}
              variant="outlined"
              required
              id="outlined-error"
              onChange={handleChange("key")}
              onBlur={handleBlur("key")}
              value={values.key}
              error={Boolean(errors.key)}
              helperText={errors.key}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              placeholder={t("input.namespace")}
              label={t("input.namespace")}
              variant="outlined"
              onChange={handleChange("namespace")}
              onBlur={handleBlur("namespace")}
              value={values.namespace}
              error={Boolean(errors.namespace)}
              helperText={errors.namespace}
            />
          </Grid>
          <Grid item xs={7}>
            {values.translates.map((i, index) => {
              return (
                <Grid container spacing={2} key={i.id}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      placeholder={t("input.language")}
                      label={t("input.language")}
                      variant="outlined"
                      onChange={handleChange(`translates.${index}.language`)}
                      value={get(values, `translates.${index}.language`, null)}
                      error={Boolean(
                        get(errors, `translates.${index}.language`, null)
                      )}
                      helperText={get(
                        errors,
                        `translates.${index}.language`,
                        null
                      )}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <TextField
                      fullWidth
                      placeholder={t("input.value")}
                      label={t("input.value")}
                      variant="outlined"
                      onChange={handleChange(`translates.${index}.value`)}
                      value={get(values, `translates.${index}.value`, null)}
                      error={Boolean(
                        get(errors, `translates.${index}.value`, null)
                      )}
                      helperText={get(
                        errors,
                        `translates.${index}.value`,
                        null
                      )}
                    />
                  </Grid>
                  {values.translates.length > 1 ? (
                    <Grid item xs={1}>
                      <IconButton
                        tabIndex={"-1"}
                        color="secondary"
                        onClick={() => onDelete(index)}
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  ) : null}
                </Grid>
              );
            })}
          </Grid>
          <Grid item xs={1}>
            <IconButton color="primary" onClick={onAdd}>
              <Add />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                history.goBack();
              }}
            >
              {t("button.cancel")}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {t("button.save")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Pane>
  );
};

EditTranslate.propTypes = {};

export default EditTranslate;

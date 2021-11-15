import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import { Pane } from "components";

const validationSchema = yup.object({
  key: yup.string().required(),
});

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: "20px",
  },
}));

const EditTranslate = ({ route, ...props }) => {
  const { t } = useTranslation();

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
      values: [{ language: "ev", value: "" }],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const onAdd = (data) => {
    setFieldValue("values", [...values.values, { language: "de", value: "" }]);
  };
  const classes = useStyles();
  return (
    <Pane title={t("title.edit")}>
      <form onSubmit={handleSubmit}>
        <Grid container classes={{ root: classes.container }} spacing={2}>
          <Grid item xs={2}>
            <TextField
              fullWidth
              placeholder={t("input.key")}
              variant="outlined"
              required
              onChange={handleChange("key")}
              onBlur={handleBlur("key")}
              value={values.key}
              helperText={errors.key}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              placeholder={t("input.namespace")}
              variant="outlined"
              onChange={handleChange("namespace")}
              onBlur={handleBlur("namespace")}
              value={values.namespace}
              helperText={errors.namespace}
            />
          </Grid>
          <Grid item xs={7}>
            {values.values.map((i, index) => {
              return (
                <Grid container spacing={2} key={i}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      placeholder={t("input.language")}
                      variant="outlined"
                      onChange={handleChange(`values.${index}.language`)}
                      value={values.values[index].language}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      placeholder={t("input.value")}
                      variant="outlined"
                      onChange={handleChange(`values.${index}.value`)}
                      value={values.values[index].value}
                    />
                  </Grid>
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

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {t("button.save")}
        </Button>
      </form>
    </Pane>
  );
};

EditTranslate.propTypes = {};

export default EditTranslate;

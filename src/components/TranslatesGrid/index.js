import React from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FilterListIcon from "@material-ui/icons/FilterList";

import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TranslatesGrid = ({ data, history, onDelete, dense = true }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table
        size={dense ? "small" : "medium"}
        stickyHeader
        className={classes.table}
        aria-label="spanning table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="center">{t("tableheader.key")}</TableCell>
            <TableCell align="center">{t("tableheader.namespace")}</TableCell>
            <TableCell align="center">{t("tableheader.langs")}</TableCell>
            <TableCell align="center">{t("tableheader.edit/delete")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data)
            ? data.map((row) => (
                <TableRow key={row.value}>
                  <TableCell align="center">{row.key}</TableCell>
                  <TableCell align="center">{row.namespace || ""}</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        history.push(
                          `/translates/edit?${new URLSearchParams({
                            key: row.key,
                            namespace: row.namespace,
                          }).toString()}`
                        );
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() =>
                        onDelete({ key: row.key, namespace: row.namespace })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TranslatesGrid.propTypes = {
  data: PropTypes.array.isRequired,
  history: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  dense: PropTypes.bool,

  // : PropTypes.
};
TranslatesGrid.defaultProps = {
  data: [],
};

export default TranslatesGrid;

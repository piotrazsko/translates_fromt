import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Popup } from "components_lib";
import { popupSelector, hidePopupAction } from "modules/popups";
import "components_lib/es/main.css";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  buttonContainer: {},
}));

const Popups = () => {
  const classes = useStyle();
  const confirms = useSelector(popupSelector);
  const dispatch = useDispatch();
  const onHidePopup = (id) => dispatch(hidePopupAction(id));
  return (
    <Fragment>
      {confirms.map((item) => (
        <Popup
          key={item.id}
          type={item.type}
          message={item.message}
          show
          showForce
          {...item}
          onSubmit={(ev) => {
            if (typeof item.onClick === "function" && item.onClick(ev)) {
              onHidePopup(item.id);
            }
          }}
          onCancel={(ev) => {
            if (typeof item.onCancel === "function" && item.onCancel(ev)) {
              onHidePopup(item.id);
            }
          }}
          onClear={(ev) => {
            if (typeof item.onClear === "function") {
              item.onCancel(ev);
            }
            onHidePopup(item.id);
          }}
          textConfirm={item.textConfirm}
          textCancel={item.textCancel || "Cancel"}
          classes={{ buttonContainer: classes.buttonContainer }}
          confirmButtonProps={{ ...item.confirmButtonProps }}
        />
      ))}
    </Fragment>
  );
};

Popups.propTypes = {};

export default Popups;

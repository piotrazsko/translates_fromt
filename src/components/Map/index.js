import React from "react";
import PropTypes from "prop-types";
import GoogleMap from "google-map-react";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core/styles";
import { faMapMarkerAlt, faMobile } from "@fortawesome/free-solid-svg-icons";

export const useStyles = makeStyles((theme) => ({
  root: { minHeight: "50vh", width: "100%" },
  marker: {
    color: theme.palette.primary.main,
    top: "-25px",
    position: "relative",
  },
}));
const AnyReactComponent = ({ text }) => {
  const classes = useStyles();

  return (
    <FontAwesomeIcon
      size="3x"
      color="green"
      className={classes.marker}
      icon={faMapMarkerAlt}
    />
  );
};

const Map = ({ data }) => {
  const classes = useStyles();
  const { center, zoom } = data;
  return data ? (
    <Grid container>
      <Grid item classes={{ item: classes.root }}>
        <GoogleMap
          bootstrapURLKeys={{ key: "AIzaSyC6pCapfNqKT-ZZI2HUMFMxZy5Imst757s" }}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          <AnyReactComponent {...center} />
        </GoogleMap>
      </Grid>
    </Grid>
  ) : null;
};

Map.propTypes = {
  data: PropTypes.shape({
    center: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    zoom: PropTypes.number,
  }).isRequired,
};
Map.defaultProps = {
  data: {
    center: { lat: 53.85248, lng: 27.49221 },
    zoom: 13,
  },
};

export default Map;

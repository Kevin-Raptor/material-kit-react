import { Grid, TextField } from "@mui/material";
import { GoogleApiWrapper } from "google-maps-react";
import { useEffect } from "react";
// import { makeStyles } from "@mui/styles";
// import zIndex from "@mui/material/styles/zIndex";

// const useStyle = makeStyles(theme => ({
//   zIndex: {
//     zIndex: 1000
//   },
// }));

const MapAutoComplete = (props) => {
  let autocomplete;
  const handleAddressChange = (e) => {
    props.setAddressString(e.target.value);
    props.setValidGmapsAddress(false);
  };

  // const classes = useStyle();

  useEffect(() => {
    autocomplete = new props.google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {
        types: ["geocode"],
        componentRestrictions: {
          country: ["in", "us"],
        },
      }
    );
    props.google.maps.event.addListener(autocomplete, "place_changed", function () {
      props.updateAddressFromAutocomplete(autocomplete.getPlace());
      props.setValidGmapsAddress(true);
    });
  }, []);

  return (
    // <Grid container style={{ width: "100%" }}>
      <TextField
        id="autocomplete"
        variant="outlined"
        color="primary"
        label="Address"
        size="small"
        value={props.addressString ? props.addressString : ""}
        onChange={handleAddressChange}
        fullWidth
        disabled={props.disabled}
        error={!props.validGmapsAddress}
        inputProps={{
          // Add a CSS class for the Autocomplete dropdown
          className: {zIndex: 1000}
        }}
      />
    // </Grid>
  );
};

const WrappedContainer = GoogleApiWrapper({
  apiKey: "AIzaSyDeLfG1GZSzZ6e5lL2SIQI6FFwPH3UNxpQ",
  options: { mapTypeId: "satellite", componentRestrictions: { country: ["US"] } },
})(MapAutoComplete);

export default WrappedContainer;

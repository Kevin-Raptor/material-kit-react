import { TextField } from "@mui/material";
import { GoogleApiWrapper } from "google-maps-react";
import { useEffect } from "react";

const MapAutoComplete = (props) => {
  let autocomplete;
  const handleAddressChange = (e) => {
    props.setAddressString(e.target.value);
    props.setValidGmapsAddress(false);
  };
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
      <TextField
        id="autocomplete"
        variant="outlined"
        color="primary"
        label="Google Map Address"
        size="small"
        value={props.addressString ? props.addressString : ''}
        onChange={handleAddressChange}
        fullWidth
        disabled={props.disabled}
      />
  );
};

const WrappedContainer = GoogleApiWrapper({
  apiKey: "AIzaSyDeLfG1GZSzZ6e5lL2SIQI6FFwPH3UNxpQ",
  options: { mapTypeId: "satellite", componentRestrictions: { country: ["US"] } },
})(MapAutoComplete);

export default WrappedContainer;

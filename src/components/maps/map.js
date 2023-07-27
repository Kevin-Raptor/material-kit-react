import React, { useState } from "react";
import { Grid } from "@mui/material";
import MapContainer from "./map-container";
import MapAutocomplete from "./map-autocomplete";
import { GoogleApiWrapper } from "google-maps-react";

const Map = (props) => {
  const [addressData, setAddressData] = useState({});
  const [addressString, setAddressString] = useState("");
  const [validGmapsAddress, setValidGmapsAddress] = useState(false);
  const [addressLatLng, setAddressLatLng] = useState({
    lat: 12.980498,
    lng: 77.576634,
  });

  const { google } = props; // Destructure the 'google' prop from the injected props

  const geocoder = new google.maps.Geocoder();

  const updateAddressFromMap = (coords) => {
    console.log(`Map.js --> updateAddressFromMap Called`)
    console.log('coords', coords)
    setAddressLatLng(coords);

    // Reverse geocode to address string
    geocoder
      .geocode({ location: coords })
      .then((response) => {
        props.handleAddressData(response.results[0])
        setAddressData(response.results[0]);
        setAddressString(response.results[0].formatted_address);
      })
      .catch((e) => console.log("Geocoder failed due to: " + e));
  };

  const updateAddressFromAutocomplete = (addressObject) => {
    console.log(`updateAddressFromAutocomplete`);
    if (typeof addressObject !== "string") {
      setAddressData(addressObject);
      setAddressString(addressObject.formatted_address);
      setAddressLatLng({
        lat: addressObject.geometry.location.lat(),
        lng: addressObject.geometry.location.lng(),
      });
    }
  };

  return (
    <>
      <Grid container sx={{ width: 1 }}>
        <Grid container justifyContent="center" style={{ height: "320px", padding: "0px 0px" }}>
          <Grid item container xs={12} style={{ position: "relative", height: "290px" }}>
            <MapContainer
              addressLatLng={addressLatLng}
              updateAddressFromMap={updateAddressFromMap}
              setValidGmapsAddress={setValidGmapsAddress}
            />
          </Grid>
        </Grid>
        {/* <Grid item container style={{marginTop: 7}}> */}
         
      </Grid>
      <Grid container>
        <Grid item xs={12}>
            <MapAutocomplete
              addressString={addressString}
              setAddressString={setAddressString}
              addressData={addressData}
              updateAddressFromAutocomplete={updateAddressFromAutocomplete}
              validGmapsAddress={validGmapsAddress}
              setValidGmapsAddress={setValidGmapsAddress}
            />
        </Grid>
      </Grid>
    </>
  );
};

const WrappedContainer = GoogleApiWrapper({
  apiKey: "AIzaSyDeLfG1GZSzZ6e5lL2SIQI6FFwPH3UNxpQ", // Replace with your actual API key
})(Map);

export default WrappedContainer;

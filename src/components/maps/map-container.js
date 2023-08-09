import { GoogleApiWrapper, Map, Marker } from "google-maps-react";

const MapContainer = (props) => {
    const mapStyles = {
        width: props.width ? props.width : '100%',
        height: props.height ? props.height : '100%'
      };

      const handleMapClick = (mapProps, map, clickEvent) => {
        console.log('MapContainer Props', props)
        console.log('clickevent', clickEvent);
        if (!props.disabled) {
          props.updateAddressFromMap({
            lat: clickEvent.latLng.lat(),
            lng: clickEvent.latLng.lng(),
          });
          if (props && props.setValidGmapsAddress) props.setValidGmapsAddress(true);
        }
      };

      return(
        <Map
        mapType={props.type ?? 'satellite'}
        google={props.google}
        zoom={17}
        style={mapStyles}
        initialCenter={props.addressLatLng}
        center={props.addressLatLng}
        onClick={handleMapClick}
        onZoomChanged={(mapProps, map) => map.setTilt(0)}
        >
            <Marker position={props.addressLatLng}></Marker>
        </Map>
      )
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDeLfG1GZSzZ6e5lL2SIQI6FFwPH3UNxpQ',
  })(MapContainer);
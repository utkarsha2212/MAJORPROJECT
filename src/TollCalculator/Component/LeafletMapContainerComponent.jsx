import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef } from "react";
import { RequestType, geocode, setDefaults } from "react-geocode";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { isEmptyOrNull, notEmptyOrNull } from "../../Utills/Helper";

const LeafletMapContainerComponent = (props) => {
  const {
    values,
    latitude,
    longitude,
    srcLocation,
    destLocation,
    setLatitude,
    setLongitude,
    setSrcLocation,
    setDestLocation,
    setSourceMetaInfo,
    setDestinationMetaInfo,
    setFieldValue,
  } = props;
  const mapRef = useRef(null);

  setDefaults({
    key: "AIzaSyA5P_rL8VpXoxfl9NG7DjXwpXSwKWBE45U", // Your API key here.
    language: "en", // Default language for responses.
    region: "es", // Default region for responses.
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    if (mapRef.current) {
      mapRef.current.setView([latitude, longitude], 6);
    }
  }, [latitude, longitude]);

  function settingFiledValues(latlng) {
    if (
      latlng?.lat !== undefined &&
      latlng?.lat !== null &&
      latlng?.lat !== "" &&
      latlng?.lng !== undefined &&
      latlng?.lng !== null &&
      latlng?.lng !== ""
    ) {
      geocode(RequestType.LATLNG, `${latlng?.lat},${latlng?.lng}`, {
        location_type: "ROOFTOP", // Override location type filter for this request.
        enable_address_descriptor: true, // Include address descriptor in response.
      })
        .then(({ results }) => {
          const address = results[0].formatted_address;
          const { city, state, country } = results[0].address_components.reduce(
            (acc, component) => {
              if (component.types.includes("locality"))
                acc.city = component.long_name;
              else if (component.types.includes("administrative_area_level_1"))
                acc.state = component.long_name;
              else if (component.types.includes("country"))
                acc.country = component.long_name;
              return acc;
            },
            {}
          );
          console.log(city, state, country);
          console.log(address);
          if (isEmptyOrNull(values.src_location)) {
            setSourceMetaInfo({
              uri: `${city},${state}`,
              city: city,
              state: state,
              country: country,
            });
            setFieldValue("src_location", address);
          } else {
            setDestinationMetaInfo({
              uri: `${city},${state}`,
              city: city,
              state: state,
              country: country,
            });
            setFieldValue("dest_location", address);
          }
        })
        .catch(console.error);
    }
  }

  useEffect(() => {
    settingFiledValues(srcLocation);
  }, [srcLocation]);
  useEffect(() => {
    settingFiledValues(destLocation);
  }, [destLocation]);

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        if (isEmptyOrNull(values.src_location)) {
          setSrcLocation(e.latlng);
        } else {
          setDestLocation(e.latlng);
        }
        map.flyTo(e.latlng, map.getZoom());
      },
    });
    if (notEmptyOrNull(srcLocation) && notEmptyOrNull(destLocation)) {
      return (
        <>
          <Marker position={srcLocation}>
            <Popup>You are here</Popup>
          </Marker>
          <Marker position={destLocation}>
            <Popup>You are here</Popup>
          </Marker>
        </>
      );
    } else if (notEmptyOrNull(srcLocation)) {
      return (
        <Marker position={srcLocation}>
          <Popup>You are here</Popup>
        </Marker>
      );
    } else if (isEmptyOrNull(srcLocation) && notEmptyOrNull(destLocation)) {
      return (
        <Marker position={destLocation}>
          <Popup>You are here</Popup>
        </Marker>
      );
    }
  }
  return (
    // Make sure you set the height and width of the map container otherwise the map won't show
    <MapContainer
      center={[latitude, longitude]}
      zoom={6}
      ref={mapRef}
      style={{ height: "500px", width: "900px" }}
    >
      <TileLayer
        attribution="&copy; "
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Additional map layers or components can be added here */}
      {/* Marker position is set to current location by default */}
      {notEmptyOrNull(srcLocation) && notEmptyOrNull(destLocation) ? (
        <>
          <LocationMarker />
          <LocationMarker />
        </>
      ) : (
        <LocationMarker />
      )}
    </MapContainer>
  );
};
export default LeafletMapContainerComponent;

/**
 * @fileoverview This file is the entry point for Toll Calculator.
 * @description This file is the entry point for Toll Calculator
 * and this component is used to calculate the toll between two locations
 * and also calculate the fuel cost and fuel efficiency,
 * and also calculate the time taken to reach the destination.
 * @module TollCalculator
 * @Author Utkarsh Pandit
 * @version 1.0.0
 * @since 09-12-2023
 */
import { encode } from "@googlemaps/polyline-codec";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import ButtonComponent from "../Layout/ButtonComponent";
import DateWrapperComponent from "../Layout/DateWrapperComponent";
import DropDownComponent from "../Layout/DropDownComponent";
import TextBoxComponent from "../Layout/TextBoxComponent";
import { GetDate, isEmptyOrNull } from "../Utills/Helper";
import Checkmark from "../assets/CheckmarkIcon";
import SwapIcon from "../assets/SwapIcon";
import LeafletMapContainerComponent from "./Component/LeafletMapContainerComponent";
import * as Constants from "./Constants";
const TollCalculator = () => {
  /** set state for setting Latitude for Marker Psition */
  const [latitude, setLatitude] =
    useState(0); /** set state for setting Longitude for Marker Psition */
  const [longitude, setLongitude] =
    useState(0); /** set state for setting Source Location Co-ordinates */
  const [srcLocation, setSrcLocation] =
    useState(
      null
    ); /* set state for setting Destination Location Co-ordinates */
  const [destLocation, setDestLocation] = useState(null);
  /** set state for setting Source Meta Info */
  const [sourceMetaInfo, setSourceMetaInfo] = useState(
    {}
  ); /** set state for setting Destination Meta Info */
  const [destinationMetaInfo, setDestinationMetaInfo] = useState({});
  const handleSubmit = (values) => {
    const payload = {
      departure_time: GetDate(values?.dprtr_tm),
      mapProvider: values?.mapProvider,
      polyline: [
        encode[(srcLocation?.lat, srcLocation?.lng)],
        encode[(destLocation?.lat, destLocation?.lng)],
      ],
      locTimes: [],
      vehicle: {
        type: values?.vehicleType,
        weight: { value: 20000, unit: "pound" },
        height: { value: 7.5, unit: "meter" },
        length: { value: 7.5, unit: "meter" },
        axles: 4,
        emissionClass: "euro_5",
      },
      fuelOptions: values?.fuelOptions,
      units: values?.units,
    };
    console.log(payload);
    axios
      .post(
        "https://apis.tollguru.com/toll/v2/complete-polyline-from-mapping-service",
        payload,
        {
          headers: {
            "x-api-key": "8D7tfpQR29QDHh84QDh6mGpdg68Jqq2b",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Formik
        initialValues={{
          src_location: "",
          dest_location: "",
          vehicleType: "",
          dprtr_tm: null,
          mapProvider: Constants.MAP_PROVIDER_INITIAL_VALUES,
          units: Constants.UNITS_INITIAL_VALUES,
          fuelOptions: Constants.FUEL_OPTIONS_INITIAL_VALUES,
        }}
        onSubmit={(values) => {
          console.log(values);
          handleSubmit(values);
        }}
      >
        {({
          setFieldValue,
          validateForm,
          handleSubmit,
          errors,
          values,
          touched,
          setFieldTouched,
        }) => (
          <Form>
            <h1>Toll Calculator</h1>
            <div className="calculation-section">
              <Field
                name="src_location"
                columnClass="source-location-container"
                className="formcontrol-textbox"
                component={TextBoxComponent}
                placeholder="Enter address or long press on map"
                maxLength="50"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setFieldValue("src_location", inputValue);
                  if (isEmptyOrNull(inputValue)) {
                    setSrcLocation(0);
                  }
                }}
              />
              <div className="swap-btn-container">
                <ButtonComponent
                  onClickButton={() => {
                    console.log("clicked");
                  }}
                  icon={<SwapIcon />}
                />
              </div>
              <Field
                name="dest_location"
                columnClass="destination-location-container"
                className="formcontrol-textbox"
                component={TextBoxComponent}
                placeholder="Enter address or long press on map"
                maxLength="50"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setFieldValue("dest_location", inputValue);
                  if (isEmptyOrNull(inputValue)) {
                    setDestLocation(0);
                  }
                }}
              />
              <div className="vehicle-type">
                <Field
                  name="vehicleType"
                  title="Select Your Vehicle"
                  data={Constants.VEHICLE_TYPE_DATA}
                  hideEmtyOption={false}
                  component={DropDownComponent}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    setFieldValue("vehicleType", inputValue);
                  }}
                  optionValueKey="vehicle_type"
                  optionLabelKey="vehicle_type"
                />
              </div>
              <div className="departure-time-container">
                <DateWrapperComponent
                  label={Constants.DEPARTURE_TIME}
                  selected={values.dprtr_tm ? values.dprtr_tm : null}
                  name="dprtr_tm"
                  onChange={(date) => {
                    if (date !== null) {
                      setFieldValue("dprtr_tm", new Date(date));
                    } else {
                      setFieldValue("dprtr_tm", null);
                    }
                  }}
                  showTimeSelect
                  timeInputLabel="Time:"
                  timeZone="Asia/Calcutta|Asia/Kolkata"
                  className="calicon"
                />
              </div>
              <div className="submit-btn-container">
                <ButtonComponent
                  onClickButton={() => {
                    console.log("clicked");
                  }}
                  type="submit"
                  content={Constants.SUBMIT_BTN_LABEL}
                  icon={<Checkmark />}
                />
              </div>
            </div>
            <LeafletMapContainerComponent
              values={values}
              latitude={latitude}
              longitude={longitude}
              srcLocation={srcLocation}
              destLocation={destLocation}
              sourceMetaInfo={sourceMetaInfo}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              setSrcLocation={setSrcLocation}
              setDestLocation={setDestLocation}
              setSourceMetaInfo={setSourceMetaInfo}
              setDestinationMetaInfo={setDestinationMetaInfo}
              setFieldValue={setFieldValue}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};
export default TollCalculator;

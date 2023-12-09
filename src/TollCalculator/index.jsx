// create react function componet
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import DropDownComponent from "../Layout/DropDownComponent";
import TextBoxComponent from "../Layout/TextBoxComponent";
import LeafletMapContainerComponent from "./Component/LeafletMapContainerComponent";
import { isEmptyOrNull } from "../Utills/Helper";

const TollCalculator = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [srcLocation, setSrcLocation] = useState(null);
  const [destLocation, setDestLocation] = useState(null);

  return (
    <>
      <Formik
        initialValues={{
          src_location: null,
          dest_location: null,
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
                className="lilly-formcontrol-textbox"
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
              <Field
                name="dest_location"
                className="lilly-formcontrol-textbox"
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
                  name="trgt_assesmnt_grp_id"
                  title="Select Your Vehicle"
                  data={[]}
                  hideEmtyOption={false}
                  component={DropDownComponent}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    setFieldValue("trgt_assesmnt_grp_id", inputValue);
                  }}
                  optionValueKey="trgt_assesmnt_grp_id"
                  optionLabelKey="trgt_assesmnt_grp_nm"
                />
              </div>
            </div>
            <LeafletMapContainerComponent
              values={values}
              latitude={latitude}
              longitude={longitude}
              srcLocation={srcLocation}
              destLocation={destLocation}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              setSrcLocation={setSrcLocation}
              setDestLocation={setDestLocation}
              setFieldValue={setFieldValue}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TollCalculator;

import en from "moment/locale/en-gb";
import PropTypes from "prop-types";
import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateWrapperComponent.css";

registerLocale("en", en);

function DateWrapperComponent({ ...props }) {
  return (
    <div className="adjutmentdiv">
      <p className="form-label" htmlFor="from">
        {props.label}
      </p>
      <DatePicker locale="en" {...props} autoComplete="off" />
      {/* erorr handling */}{" "}
    </div>
  );
}
DateWrapperComponent.defaultProps = {
  mandatorySign: false,
  printIcon: false,
  label: "",
};
DateWrapperComponent.propTypes = {
  mandatorySign: PropTypes.bool,
  printIcon: PropTypes.bool,
  label: PropTypes.string,
};
export default DateWrapperComponent;

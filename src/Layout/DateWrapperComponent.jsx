/* eslint-disable react/jsx-props-no-spreading */
import ja from "date-fns/locale/ja";
import PropTypes from "prop-types";
import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ja", ja);

function DateWrapperComponent({ ...props }) {
  return (
    <div className="adjutmentdiv" style={{ paddingLeft: 0 }}>
      <p className="form-label" htmlFor="from">
        {props.label}
      </p>
      <DatePicker
        locale="ja"
        dateFormatCalendar="yyyy年 LLLL"
        {...props}
        autoComplete="off"
      />

      {/* erorr handling */}
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

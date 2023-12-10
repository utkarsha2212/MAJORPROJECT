/**
 * @fileoverview TextBoxComponent component will render the text box with label and mandatory sign
 * @author Utkarsha Pandit
 * @version 0.0.1
 * @since 09-12-2023
 */
import PropTypes from "prop-types";
import React from "react";
import Col from "react-bootstrap/Col";
import { RiErrorWarningFill } from "react-icons/ri";
import "./TextBoxComponent.css";
function TextBoxComponent({
  autoWidth,
  field, // { name, value, onChange, onBlur }
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  maxLength,
  columnClass,
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) {
  return (
    <>
      {/* props managing column responsiveness , label ,print icon,mandatorySign,side text ,name */}{" "}
      <Col
        xs={xs}
        sm={sm}
        md={md}
        lg={lg}
        xl={xl}
        xxl={xxl}
        className={columnClass}
      >
        {" "}
        <div>
          {/* to Set css property */}{" "}
          <input type="text" maxLength={maxLength} {...field} {...props} />{" "}
        </div>
        {touched[field.name] && errors[field.name] && (
          <div className="error form-invalid-feedback">
            {" "}
            <span className="invalid-icon">
              <RiErrorWarningFill />{" "}
            </span>
            &nbsp; {errors[field.name]}{" "}
          </div>
        )}
      </Col>
    </>
  );
}
/*
  export reusable LillyTextBoxComponent for using all the screen
 */
TextBoxComponent.propTypes = {
  autoWidth: PropTypes.bool,
  field: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  }),
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object,
  }),
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  xxl: PropTypes.number,
  maxLength: PropTypes.string,
  columnClass: PropTypes.string,
};
TextBoxComponent.defaultProps = {
  autoWidth: false,
  maxLength: "100",
  field: {
    name: "",
    value: "",
    onChange: () => {},
    onBlur: () => {},
  },
  form: {
    touched: {},
    errors: {},
  },
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
  columnClass: "",
};
export default TextBoxComponent;

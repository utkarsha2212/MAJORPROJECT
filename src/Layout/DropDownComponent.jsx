/**
 * @fileoverview Dropdown component to render dropdowns with label
 * @Author Utkarsha Pandit
 * @version 0.0.1
 * @since 09-12-2020
 */
import React from "react";
import Col from "react-bootstrap/Col";
import { RiErrorWarningFill } from "react-icons/ri";
import "./DropDownComponent.css";

function DropDownComponent({
  optionValueKey,
  optionLabelKey,
  hideEmtyOption,
  sideText,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors },
  ...props
}) {
  const isDisable = hideEmtyOption ? false : true;
  /* **********\
* to set first element of dropdow to be empty
* reciving the label and drop down data from props
/********** */
  return (
    <Col xs={props.xs} md={props.md} lg={props.lg}>
      <div className={`select-wrapper ${sideText ? "select-wrapper2" : ""} `}>
        <label className="form-label-select" htmlFor="select">
          {props.title}
        </label>
        <select
          className={`lds-select-field1 ${
            errors && touched && touched[field.name] && errors[field.name]
              ? "error"
              : ""
          }`}
          {...field}
          {...props}
        >
          {isDisable && <option key="1" value="" />}
          {props.data &&
            props.data.length > 0 &&
            props?.data?.map((item, index) => (
              <option key={index} value={item[optionValueKey || "value"]}>
                {item[optionLabelKey || "value"]}
              </option>
            ))}
        </select>
        {sideText && (
          <span
            style={{
              padding: 15,
            }}
          >
            {sideText}
          </span>
        )}
      </div>

      {touched[field.name] && errors[field.name] && (
        <div className="error form-invalid-feedback">
          <span className="invalid-icon">
            <RiErrorWarningFill />
          </span>
          &nbsp;
          {errors[field.name]}
        </div>
      )}
    </Col>
  );
}

export default DropDownComponent;

/**
 * @fileoverview ButtonComponent is a reuseable component
 * @Author Utkarsha Pandit
 * @version 0.0.1
 * @since 09-12-2020
 */
import PropTypes from "prop-types";
import React from "react";
import "./ButtonComponent.css";
/* reuseable  class component */
function ButtonComponent(props) {
  const { onClickButton, content, icon, hasClass, isDisabled, type } = props;
  return (
    <button
      id="button"
      disabled={isDisabled}
      onClick={onClickButton}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`default-btn ${hasClass}`}
    >
      <span className="paddingText p-0 Delete-icon1">
        {icon}
        {content}
      </span>
    </button>
  );
}

ButtonComponent.propTypes = {
  icon: PropTypes.any,
  isDisabled: PropTypes.any,
  hasClass: PropTypes.any,
  content: PropTypes.string,
  onClickButton: PropTypes.func,
  type: PropTypes.string,
};
ButtonComponent.defaultProps = {
  icon: "",
  isDisabled: false,
  hasClass: "",
  type: "button",
  content: "",
  onClickButton: () => {},
};
export default ButtonComponent;

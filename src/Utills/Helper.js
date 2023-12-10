import moment from "moment";
import "moment/locale/en-gb";

moment().locale("en");

/**
 * @isEmptyOrNull check for empty or null
 * @param {*} element
 * @returns {boolean} true
 * @returns {boolean} false
 */
export function isEmptyOrNull(element) {
  if (
    element === null ||
    element === undefined ||
    element === "" ||
    element === 0
  ) {
    return true;
  }
  return false;
}
/**
 * @notEmptyOrNull check for empty or null
 * @param {*} element
 * @returns {boolean} true
 * @returns {boolean} false
 */
export function notEmptyOrNull(element) {
  if (
    element !== null &&
    element !== undefined &&
    element !== "" &&
    element !== 0
  ) {
    return true;
  }
  return false;
}
/**
 * @GetDate return date in Default format
 * @param {*} value
 * @returns
 */
export function GetDate(value) {
  if (value) {
    return moment(value).format();
  }
  return "";
}

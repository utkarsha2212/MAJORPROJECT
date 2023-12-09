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

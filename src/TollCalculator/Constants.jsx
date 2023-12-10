/**
 * @fileoverview Constants for TollCalculator component.
 * @description This file defines constants for TollCalculator component.
 */
export const VEHICLE_TYPE_DATA = [
  {
    vehicle_type: "Car SUV or Pickup Truck",
  },
  {
    vehicle_type: "Rideshare",
  },
  {
    vehicle_type: "Bus",
  },
  {
    vehicle_type: "Truck",
  },
  {
    vehicle_type: "Motorcycle",
  },
  {
    vehicle_type: "Taxi",
  },
  {
    vehicle_type: "Carpool",
  },
  {
    vehicle_type: "RV",
  },
  {
    vehicle_type: "EV",
  },
];
export const MAP_PROVIDER_INITIAL_VALUES = "google";
export const RETURN_PATH_INITIAL_VALUES = "herePath";
export const SUBMIT_BTN_LABEL = "Submit";
export const TRUCK_INITIAL_VALUES = {
  truckRestrictionPenalty: "soft",
};
export const UNITS_INITIAL_VALUES = {
  currencyUnit: "INR",
  fuelUnit: "liter",
};
export const FUEL_OPTIONS_INITIAL_VALUES = {
  fuelCost: { value: 104.42, currency: "INR", units: "INR/liter" },
  fuelEfficiency: { city: 12, hwy: 15, units: "kmpl" },
};
export const DEPARTURE_TIME = "DEPARTURE TIME";

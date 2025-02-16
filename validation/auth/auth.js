const Validator = require("validator");
const isEmpty = require("../isEmpty");

function validationRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.surname = !isEmpty(data.surname) ? data.surname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.role = !isEmpty(data.role) ? data.role : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isLength(data.surname, { min: 3, max: 30 })) {
    errors.surname = "Surname must be between 3 and 30 characters";
  }

  if (Validator.isEmpty(data.surname)) {
    errors.surname = "Surname field is required";
  }

  if (!Validator.isLength(data.phone, { min: 6, max: 12 })) {
    errors.phone = "Phone number must be between 6 and 12 characters";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.role)) {
    errors.password = "Role field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

function validtionUpdateInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.surname = !isEmpty(data.surname) ? data.surname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.role = !isEmpty(data.role) ? data.role : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isLength(data.surname, { min: 3, max: 30 })) {
    errors.surname = "Surname must be between 3 and 30 characters";
  }

  if (Validator.isEmpty(data.surname)) {
    errors.surname = "Surname field is required";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.role)) {
    errors.password = "Role field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = {
  validationRegisterInput,
  validtionUpdateInput,
};

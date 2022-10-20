export const signUpValidation = (data) => {
  let error = {};
  const nameRegex =
    /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/;
  const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;
  if (data.name.length <= 3) {
    error.name = "User name must be 4 letters";
  } else if (!nameRegex.test(data.name)) {
    error.name = "Invalid user Name";
  }
  //validation for email
  if (!emailRegex.test(data.email)) {
    error.email = "Invalid email";
  }
  if (data.password.length <= 4) {
    error.password = "password must be 5 letters";
  }
  if (data.password !== data.confirmPassword) {
    error.confirmPassword = "password should be match";
  }
  return error;
};
export const loginValidation = (data) => {
  let error = {};
  const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;
  //validation for email
  if (!emailRegex.test(data.email)) {
    error.email = "Invalid email";
  }
  if (data.password.length <= 4) {
    error.password = "password must be 5 letters";
  }

  return error;
};

/** @format */

export function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Email is required';
  } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
    error = 'Please enter a proper email!';
  }
  return error;
}
export function validateName(value) {
  let error;
  if (!value) {
    error = 'Name is required';
  } else if (value.length < 3) {
    error = 'Too short!';
  } else if (value.length > 15) {
    error = 'Too long!';
  }
  return error;
}
export function validateMessage(value) {
  let error;
  if (!value) {
    error = 'Message is required';
  } else if (value.length < 50) {
    error = 'Too short!';
  } else if (value.length > 500) {
    error = 'You have reached to max charachter limit!';
  }
  return error;
}
export function validatePassword(value) {
  let error;
  if (!value) {
    error = 'Password is required';
  } else if (value.length < 8) {
    error = 'Too short!';
  } else if (value.length > 12) {
    error = 'Too long!';
  }
  return error;
}
export function validateCPassword(value) {
  let error;
  if (!value) {
    error = 'Password is required';
  } else if (value.length < 8) {
    error = 'Too short!';
  } else if (value.length > 12) {
    error = 'Too long!';
  }
  return error;
}
export function validateLoginPassword(value) {
  let error;
  if (!value) {
    error = 'Please enter your password to login!';
  }
  return error;
}
export function validateLoginEmail(value) {
  let error;
  if (!value) {
    error = 'Please enter your email to login!';
  } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
    error = 'Please enter a proper email!';
  }
  return error;
}

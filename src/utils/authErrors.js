import { FORM_ERROR } from 'final-form';

const authErrors = {
  'weak-password': {
    errorType: 'password',
    errorMessage: 'Password should be at least 6 characters',
  },
  'user-not-found': {
    errorType: 'email',
    errorMessage: 'Invalid email address',
  },
  'invalid-email': {
    errorType: 'email',
    errorMessage: 'Invalid email address',
  },
  'email-already-in-use': {
    errorType: 'email',
    errorMessage: 'Email already is used',
  },
  'wrong-password': {
    errorType: 'password',
    errorMessage: 'Invalid password',
  },
  'no-email': {
    errorType: 'email',
    errorMessage: 'Enter email address'
  },

  'no-password': {
    errorType: 'password',
    errorMessage: 'Enter password'
  },
  'password-not-match': {
    errorType: 'password',
    errorMessage: 'Password does not match'
  }
};

const isEmptyData = (email, password, passwordConfirm, isSignUp = false) => {
  const errors = {};
  if (!email) {
    errors.email = authErrors['no-email'].errorMessage;
  }
  if (!password) {
    errors.password = authErrors['no-password'].errorMessage;
  }
  if (isSignUp && !passwordConfirm) {
    errors.passwordConfirm = 'Confirm password';
  }
  if (isSignUp && password !== passwordConfirm) {
    errors.passwordConfirm = authErrors['password-not-match'].errorMessage;
  }
  return errors;
};

const signInValidate = (data) => {
  const { email, password } = data;
  return isEmptyData(email, password);
};

const signUpValidate = (data) => {
  const { email, password, passwordConfirm } = data;
  return isEmptyData(email, password, passwordConfirm, true);
};

const catchAuthError = ({ message }) => {
  const { errorType, errorMessage } = authErrors[message.match(/auth\/([\w-]*)/)[1]];
  return Promise.resolve({
    [errorType]: errorMessage,
    [FORM_ERROR]: true
  });
};

export { authErrors, signInValidate, catchAuthError, signUpValidate };

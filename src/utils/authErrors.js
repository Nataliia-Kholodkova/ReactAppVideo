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
  }
};

export default authErrors;

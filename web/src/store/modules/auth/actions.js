export function signInRequest(user) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {
      user,
    },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signUpRequest(user) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { user },
  };
}

export function signUpSuccess() {
  return {
    type: '@auth/SIGN_UP_SUCCESS',
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}

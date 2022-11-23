import AuthService from '../../services/authService';
import TokenService from '../../services/tokenService';
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FROM_REDUX, LOGOUT_SUCCESS, REFRESH_TOKEN } from './types';

// login action
export const loginAccount = (user) => {
  return (dispatch, getState) => {
    dispatch(loginAccountRequest());
    try {
      AuthService.login(user)
        .then((res) => {
          if (res.data.token) {
            TokenService.setUser(res.data);
          }
          dispatch(loginAccountSuccess(res));
        })
        .catch((e) => {
          dispatch(loginAccountError(e));
        });
    } catch (e) {
      dispatch(loginAccountError(e));
    }
  };
};

export const loginAccountRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginAccountSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

export const loginAccountError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
};

// logout action
export const logout = (refreshToken) => {
  return (dispatch, getState) => {
    try {
      AuthService.logout(refreshToken)
        .then((res) => {
          dispatch(logoutSuccess(res));
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };
};

export const logoutSuccess = (res) => {
  return {
    type: LOGOUT_SUCCESS,
    payload: res,
  };
};

// logout from redux - remove user
export const logoutFromRedux = () => {
  return {
    type: LOGOUT_FROM_REDUX,
  };
};

// refresh token action
export const refreshToken = (accessToken) => {
  return (dispatch, getState) => {
    dispatch(refreshTokenSuccess(accessToken));
  };
};

export const refreshTokenSuccess = (accessToken) => {
  return {
    type: REFRESH_TOKEN,
    payload: accessToken,
  };
};

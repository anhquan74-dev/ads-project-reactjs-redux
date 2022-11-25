import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FROM_REDUX,
  LOGOUT_SUCCESS,
  REFRESH_TOKEN,
} from '../actions/types';
import { toast } from 'react-toastify';
const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? {
      login: {
        user,
        isLoading: false,
        isError: false,
        isLoggedIn: true,
        status: 200,
      },
    }
  : {
      login: {
        user: null,
        isLoading: false,
        isError: false,
        isLoggedIn: false,
        status: null,
      },
    };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        login: {
          user: null,
          isLoading: true,
          isError: false,
          isLoggedIn: false,
          status: null,
        },
      };
    case LOGIN_SUCCESS:
      toast.success('Login Success');
      return {
        ...state,
        login: {
          user: action.payload.data,
          isLoading: false,
          isError: false,
          isLoggedIn: true,
          status: action.payload.status,
        },
      };
    case LOGIN_ERROR:
      return {
        ...state,
        login: {
          user: null,
          isLoading: false,
          isError: true,
          isLoggedIn: false,
          status: action.payload.response.status,
        },
      };
    case LOGOUT_SUCCESS:
      toast.success(action.payload.data.message);
      return {
        ...state,
        login: {
          user: null,
          isLoading: false,
          isError: false,
          isLoggedIn: false,
          status: '',
          message: '',
        },
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        login: {
          user: { ...state.login.user, token: action.payload },
        },
      };
    case LOGOUT_FROM_REDUX:
      toast.success('Auto Logout!');
      return {
        ...state,
        login: {
          user: null,
          isLoading: false,
          isError: false,
          isLoggedIn: false,
          status: '',
          message: '',
        },
      };
    default:
      return state;
  }
};

export default authReducer;

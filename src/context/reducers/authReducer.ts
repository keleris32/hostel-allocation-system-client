import { authConstants } from '../../enums/authEnums';

interface AuthReducerTypes {
  type: authConstants;
  payload?: object | string;
}

const authReducer = (state: any, { type, payload }: AuthReducerTypes) => {
  switch (type) {
    case authConstants.REGISTER_LOADING:
      return {
        ...state,
        registerLoading: true,
        registerError: '',
      };

    case authConstants.LOGIN_LOADING:
      return {
        ...state,
        loginLoading: true,
        loginError: '',
      };

    case authConstants.LOGOUT_LOADING:
      return {
        ...state,
        logoutLoading: true,
        logoutError: '',
      };

    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        data: payload,
        isLoggedIn: true,
      };

    case authConstants.REGISTER_SUCCESS:
      return {
        ...state,
        registerLoading: false,
        data: payload,
        isLoggedIn: true,
      };

    case authConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        logoutLoading: false,
        isLoggedIn: false,
      };

    case authConstants.LOGIN_ERROR:
      return {
        ...state,
        loginLoading: false,
        loginError: payload,
      };

    case authConstants.REGISTER_ERROR:
      return {
        ...state,
        registerLoading: false,
        registerError: payload,
      };

    case authConstants.LOGOUT_ERROR:
      return {
        ...state,
        logoutLoading: false,
        logoutError: payload,
      };
  }
};

export default authReducer;

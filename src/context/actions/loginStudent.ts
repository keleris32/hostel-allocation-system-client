// import React from 'react';
import { authConstants } from '../../enums/authEnums';
import axiosInstance from '../../utils/axiosInterceptor';
import { setAccessToken } from '../../utils/accessToken';

interface FormPropTypes {
  matric_no: string;
  password: string;
}

// interface ErrorStateType {
//   setErrorState: () => void;
// }

export const loginStudent =
  (loginData: FormPropTypes, setIsErrorAlertActive: any) =>
  async (dispatch: any) => {
    dispatch({
      type: authConstants.LOGIN_LOADING,
    });

    try {
      const response = await axiosInstance.post('auth/login', loginData);

      setAccessToken(response.data.data.access_token);

      console.log(JSON.stringify(response.data));

      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: response.data.data,
      });
    } catch (error: any) {
      dispatch({
        type: authConstants.LOGIN_ERROR,
        payload:
          error.response.data.message ??
          'Please check your internet connection and try again later!',
      });

      setIsErrorAlertActive(true);
    }
  };

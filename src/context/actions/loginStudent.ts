// import React from 'react';
import { authConstants } from '../../enums/authEnums';
import axiosInstance from '../../utils/axiosInterceptor';
import { setAccessToken } from '../../utils/accessToken';
import { NavigateFunction } from 'react-router-dom';
import { setStudent } from '../../utils/storageUtils';

interface FormPropTypes {
  matric_no: string;
  password: string;
}

// interface ErrorStateType {
//   setErrorState: () => void;
// }

export const loginStudent =
  (
    loginData: FormPropTypes,
    setIsErrorAlertActive: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: NavigateFunction
  ) =>
  async (dispatch: any) => {
    await dispatch({
      type: authConstants.LOGIN_LOADING,
    });

    try {
      const response = await axiosInstance.post('auth/login', loginData);

      setAccessToken(response.data.data.access_token);

      setStudent(response.data.data.id);

      await dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: response.data.data,
      });

      navigate('/');
    } catch (error: any) {
      console.log('Error >', JSON.stringify(error, null, 2));
      console.log('Error >>>', JSON.stringify(error.response, null, 2));
      await dispatch({
        type: authConstants.LOGIN_ERROR,
        payload:
          error.response.data.message ??
          'Please check your internet connection and try again later!',
      });

      setIsErrorAlertActive(true);
    }
  };

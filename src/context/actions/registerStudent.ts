import { authConstants } from '../../enums/authEnums';
import axiosInstance from '../../utils/axiosInterceptor';
import { setAccessToken } from '../../utils/accessToken';
import { RegistrationFormTypes } from '../../pages/Register';
import { NavigateFunction } from 'react-router-dom';
import { setStudent } from '../../utils/storageUtils';

export const registerStudent =
  // @ts-ignore


    (
      registrationFormData: RegistrationFormTypes,
      setIsErrorAlertActive: React.Dispatch<React.SetStateAction<boolean>>,
      navigate: NavigateFunction
    ) =>
    // @ts-ignore
    async (dispatch) => {
      await dispatch({
        type: authConstants.REGISTER_LOADING,
      });
      try {
        const response = await axiosInstance.post(
          'auth/register',
          registrationFormData
        );

        setAccessToken(response.data.data.access_token);

        setStudent(response.data.data.id);

        await dispatch({
          type: authConstants.REGISTER_SUCCESS,
          payload: response.data.data,
        });

        navigate('/');
      } catch (error: any) {
        await dispatch({
          type: authConstants.REGISTER_ERROR,
          payload:
            error.response.data.message ??
            'Please check your internet connection and try again later!',
        });

        setIsErrorAlertActive(true);
      }
    };

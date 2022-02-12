import { authConstants } from '../../enums/authEnums';
import axiosInstance from '../../utils/axiosInterceptor';
import { setAccessToken } from '../../utils/accessToken';

interface PropTypes {
  matricNumber: string;
  password: string;
}

export const loginStudent =
  ({ matricNumber: matric_no, password }: PropTypes) =>
  async (dispatch: any) => {
    dispatch({
      type: authConstants.LOGIN_LOADING,
    });
    try {
      const response = await axiosInstance.post('auth/login', {
        matric_no,
        password,
      });

      setAccessToken(response.data.data.access_token);

      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: response.data.data,
      });
    } catch (error: any) {
      dispatch({
        type: authConstants.LOGIN_ERROR,
        payload: error?.message,
      });
    }
  };

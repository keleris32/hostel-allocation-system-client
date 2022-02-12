import { authConstants } from '../../enums/authEnums';
import axiosInstance from '../../utils/axiosInterceptor';
import { setAccessToken } from '../../utils/accessToken';

export const registerStudent =
  // @ts-ignore


    ({ matricNumber: matric_no, password }) =>
    // @ts-ignore
    async (dispatch) => {
      dispatch({
        type: authConstants.REGISTER_LOADING,
      });
      try {
        const response = await axiosInstance.post('auth/login', {
          matric_no,
          password,
        });

        setAccessToken(response.data.data.access_token);

        dispatch({
          type: authConstants.REGISTER_SUCCESS,
          payload: response.data.data,
        });
      } catch (error: any) {
        dispatch({
          type: authConstants.REGISTER_ERROR,
          payload: error?.message,
        });
      }
    };

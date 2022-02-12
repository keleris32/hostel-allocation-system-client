export interface InitialStateTypes {
  loginLoading: boolean;
  registerLoading: boolean;
  logoutLoading: boolean;
  loginError: string;
  registerError: string;
  logoutError: string;
  data?: Object;
  isLoggedIn: boolean;
}

const initialState: InitialStateTypes = {
  loginLoading: false,
  registerLoading: false,
  logoutLoading: false,
  loginError: '',
  registerError: '',
  logoutError: '',
  data: {},
  isLoggedIn: false,
};

export default initialState;

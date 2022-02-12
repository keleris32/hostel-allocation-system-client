import React, { createContext, useReducer } from 'react';
import { authInitialState } from './initialStates';
import { authReducer } from './reducers';

export const GlobalContext = createContext({});

const GlobalProvider: React.FC = ({ children }) => {
  // Auth global state
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  return (
    <GlobalContext.Provider value={{ authState, authDispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

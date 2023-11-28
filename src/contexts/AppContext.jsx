import React, { createContext, useReducer } from 'react'
import reducer, { initialState } from '../reducers/reducer';

export const GlobalContext = createContext();

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      { children }
    </GlobalContext.Provider>
  )
}

export default AppContext
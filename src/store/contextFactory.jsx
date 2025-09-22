// src/store/contextFactory.js
import { createContext, useContext, useReducer } from "react";

// Factory para crear un store con reducer
export function createStore(reducer, initialState) {
  const StateContext = createContext();
  const DispatchContext = createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </StateContext.Provider>
    );
  };

  const useSelector = (selector) => {
    const state = useContext(StateContext);
    return selector(state);
  };

  const useDispatch = () => useContext(DispatchContext);

  return { Provider, useSelector, useDispatch };
}
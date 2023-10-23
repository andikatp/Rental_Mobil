import React, { createContext, useReducer, useContext } from "react";

const INITIAL_STATE = {
  kota: undefined,
  dates: [],
  passanger: 1,
};

export const SearchContext = createContext(INITIAL_STATE);

const searchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{ city: state.kota, dates: state.dates, passanger: state.passanger, dispatch }}
    >
      {children}
    </SearchContext.Provider>
  );
};


const MyComponent = () => {
  const { city, dates, passanger, dispatch } = useContext(SearchContext);
};

export default SearchContextProvider;

import { useReducer, createContext, useContext, useEffect } from "react";
import reducer from "./reducer";
import {
  CLEAR_CART,
  REMOVE_CART,
  INCREASE,
  DECREASE,
  DISPLAYITEMS,
  LOADING,
} from "./action";
import Total from "./utlis";

const AppContext = createContext();

export const useGlobalContext = () => useContext(AppContext);
const defaultState = {
  isLoading: true,
  cart: new Map(),
  total: 0,
  amount: 0,
};
const url = "https://www.course-api.com/react-useReducer-cart-project";
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { totalAmount, totalCost } = Total(state.cart);
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const removeCart = (id) => {
    dispatch({ type: REMOVE_CART, payLoad: { id } });
  };
  const increaseCart = (id) => {
    dispatch({ type: INCREASE, payLoad: { id } });
  };
  const decreaseCart = (id) => {
    dispatch({ type: DECREASE, payLoad: { id } });
  };
  const displayItems = (data) => {
    dispatch({ type: DISPLAYITEMS, payLoad: { data } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // dispatch({ type: LOADING });
        const resp = await fetch(url);
        const response = await resp.json();
        displayItems(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeCart,
        increaseCart,
        decreaseCart,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

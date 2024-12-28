import {
  CLEAR_CART,
  REMOVE_CART,
  INCREASE,
  DECREASE,
  DISPLAYITEMS,
} from "./action";

const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    const newCart = new Map();
    return { ...state, cart: newCart };
  }
  if (action.type === REMOVE_CART) {
    const itemId = action.payLoad.id;
    const newCart = state.cart;
    newCart.delete(itemId);
    return { ...state, cart: newCart };
  }
  if (action.type === INCREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payLoad.id;
    const item = newCart.get(itemId);
    const newItem = { ...item, amount: item.amount + 1 };
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }
  if (action.type === DECREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payLoad.id;
    const item = newCart.get(itemId);

    if (item.amount === 1) {
      newCart.delete(itemId);
      return { ...state, cart: newCart };
    }
    const newItem = { ...item, amount: item.amount - 1 };
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }
  if (action.type === "totalAmount") {
    return { ...state, amount: action.payLoad.amount };
  }
  if (action.type === DISPLAYITEMS) {
    const newCart = new Map(action.payLoad.data.map((item) => [item.id, item]));
    console.log(newCart);
    return { ...state, cart: newCart };
  }
  throw Error(`no matching "${action.type}" - action type`);
};

export default reducer;

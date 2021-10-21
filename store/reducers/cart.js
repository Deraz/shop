import { ADD_TO_CART, DELETE_ITEM } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
  items: {},
  sum: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, price, title } = action.product;
      if (state.items[id]) {
        const updatedCartItem = new CartItem(
          state.items[id].quantity + 1,
          price,
          title,
          state.items[id].sum + price
        );
        return {
          ...state,
          items: { ...state.items, [id]: updatedCartItem },
          sum: state.sum + price,
        };
      } else {
        const newCartItem = new CartItem(1, price, title, price);
        return {
          ...state,
          items: { ...state.items, [id]: newCartItem },
          sum: state.sum + price,
        };
      }
    case DELETE_ITEM:
      const { pid } = action;
      const selectedItem = state.items[pid];
      const qty = selectedItem.quantity;
      let updatedCartItems;
      if (qty > 1) {
        const updatedCartItem = new CartItem(
          qty - 1,
          selectedItem.productPrice,
          selectedItem.productTitle,
          selectedItem.sum - selectedItem.productPrice
        );
        updatedCartItems = { ...state.items, [pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        sum: state.sum - selectedItem.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    default:
      return state;
  }
};

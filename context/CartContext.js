import React, { useReducer, createContext } from "react";

const initialState = {
  cart: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      // check if item is already in cart via id
      // if item in cart, increment qty
      // else add item and set qty to 1
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (itemInCart) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }],
        };
      }

    case "UPDATE_QTY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: [...state.cart.filter((item) => item.id !== action.payload)],
      };

    default:
      return state;
  }
};

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const updateQty = (itemId, qty) => {
    dispatch({ type: "UPDATE_QTY", payload: { id: itemId, qty } });
  };
  const removeFromCart = (itemId) => {
    dispatch({ type: "REMOVE_ITEM", payload: itemId });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, updateQty, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };

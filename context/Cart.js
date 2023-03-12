import React, { useReducer, createContext } from "react";

const initialState = {
  cart: [],
};


const cartReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_ITEM':
            return {...state, cart: [...state.cart, ]}
    }
}

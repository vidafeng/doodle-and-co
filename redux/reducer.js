import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  shippingAddress: {
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case "address/saveShippingAddress":
      return { ...state, shippingAddress: action.payload };
    default:
      return state;
  }
};

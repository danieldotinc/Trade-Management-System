import {
  GET_PRODUCT,
  GET_PRODUCTS,
  DELETE_PRODUCT,
  ADD_PRODUCT
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return { ...state, products: action.payload };
    case GET_PRODUCTS:
      return { ...state, products: action.payload };
    case ADD_PRODUCT:
      return { ...state, products: [action.payload, ...state.products] };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product._id !== action.payload
        )
      };
    default:
      return state;
  }
}

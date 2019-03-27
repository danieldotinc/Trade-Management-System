import { combineReducers } from "redux";
import productReducer from "./productReducer";
import personReducer from "./personReducer";

export default combineReducers({
  product: productReducer,
  person: personReducer
});

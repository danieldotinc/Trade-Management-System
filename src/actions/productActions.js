import {
  GET_PRODUCT,
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT
} from "./types";
import {
  getProduct,
  getProducts,
  deleteProduct,
  saveProduct,
  updateProduct
} from "../services/productService";
import { ToastContainer, toast } from "react-toastify";

export const getProductItem = id => async dispatch => {
  const { data } = await getProduct(id);
  dispatch({
    type: GET_PRODUCT,
    payload: data
  });
};

export const getProductItems = () => async dispatch => {
  const { data } = await getProducts();
  dispatch({
    type: GET_PRODUCTS,
    payload: data
  });
};

export const addProductItem = product => async dispatch => {
  try {
    await saveProduct(product);
    dispatch({
      type: ADD_PRODUCT,
      payload: product
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      toast.error("Error!");
    }
  }
};

export const deleteProductItem = id => async dispatch => {
  try {
    await deleteProduct(id);
    dispatch({
      type: DELETE_PRODUCT,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      toast.error("این آیتم قبلا حذف شده است.");
    }
  }
};

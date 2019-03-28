import {
  GET_ERRORS,
  CLEAR_CURRENT_CATEGORY,
  CATEGORY_LOADING,
  GET_CATEGORY,
  GET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY
} from "./types";
import {
  getCategory,
  getCategories,
  deleteCategory,
  saveCategory,
  updateCategory
} from "../services/categoryService";
import { ToastContainer, toast } from "react-toastify";

export const setCategoryLoading = () => {
  return {
    type: CATEGORY_LOADING
  };
};

export const clearCurrentCategory = () => {
  return {
    type: CLEAR_CURRENT_CATEGORY
  };
};

export const getCategoryItem = id => async dispatch => {
  dispatch(setCategoryLoading());
  const { data } = await getCategory(id);
  dispatch({
    type: GET_CATEGORY,
    payload: data
  });
};

export const getCategoryItems = () => async dispatch => {
  dispatch(setCategoryLoading());
  const { data } = await getCategories();
  dispatch({
    type: GET_CATEGORIES,
    payload: data
  });
};

export const addCategoryItem = category => async dispatch => {
  try {
    await saveCategory(category);
    dispatch({
      type: ADD_CATEGORY,
      payload: category
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      toast.error("Error!");
    }
  }
};

export const deleteCategoryItem = id => async dispatch => {
  try {
    await deleteCategory(id);
    dispatch({
      type: DELETE_CATEGORY,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      toast.error("این آیتم قبلا حذف شده است.");
    }
  }
};

import {
  GET_ERRORS,
  CLEAR_CURRENT_COMPANY,
  COMPANY_LOADING,
  GET_COMPANY,
  GET_COMPANIES,
  ADD_COMPANY,
  DELETE_COMPANY
} from "./types";
import {
  getCompany,
  getCompanies,
  deleteCompany,
  saveCompany,
  updateCompany
} from "../services/companyService";
import { ToastContainer, toast } from "react-toastify";

export const setCompanyLoading = () => {
  return {
    type: COMPANY_LOADING
  };
};

export const clearCurrentCompany = () => {
  return {
    type: CLEAR_CURRENT_COMPANY
  };
};

export const getCompanyItem = id => async dispatch => {
  dispatch(setCompanyLoading());
  const { data } = await getCompany(id);
  dispatch({
    type: GET_COMPANY,
    payload: data
  });
};

export const getCompanyItems = () => async dispatch => {
  dispatch(setCompanyLoading());
  const { data } = await getCompanies();
  dispatch({
    type: GET_COMPANIES,
    payload: data
  });
};

export const addCompanyItem = company => async dispatch => {
  try {
    await saveCompany(company);
    dispatch({
      type: ADD_COMPANY,
      payload: company
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      toast.error("Error!");
    }
  }
};

export const deleteCompanyItem = id => async dispatch => {
  try {
    await deleteCompany(id);
    dispatch({
      type: DELETE_COMPANY,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      toast.error("این آیتم قبلا حذف شده است.");
    }
  }
};

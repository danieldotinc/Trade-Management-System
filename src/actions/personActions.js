import {
  PERSON_LOADING,
  GET_PERSON,
  GET_PERSONS,
  ADD_PERSON,
  DELETE_PERSON
} from "./types";

import {
  getPerson,
  getPersons,
  deletePerson,
  savePerson,
  updatePerson
} from "../services/personService";
import { ToastContainer, toast } from "react-toastify";

export const setCurrentPerson = () => {
  return { type: PERSON_LOADING };
};

export const getPersonItems = () => async dispatch => {
  dispatch(setCurrentPerson());
  const { data } = await getPersons();
  dispatch({
    type: GET_PERSONS,
    payload: data
  });
};

export const getPersonItem = id => async dispatch => {
  dispatch(setCurrentPerson());
  try {
    const { data } = await getPerson(id);
    dispatch({
      type: GET_PERSON,
      payload: data
    });
  } catch (ex) {
    if (ex.response) {
      toast.error("Error!");
    }
  }
};

export const addPersonItem = person => async dispatch => {
  try {
    await savePerson(person);
    dispatch({
      type: ADD_PERSON,
      payload: person
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      toast.error("Error!");
    }
  }
};

export const deletePersonItem = id => async dispatch => {
  try {
    await deletePerson(id);
    dispatch({
      type: DELETE_PERSON,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      toast.error("این آیتم قبلا حذف شده است.");
    }
  }
};

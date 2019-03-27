import {
  GET_PERSONS,
  GET_PERSON,
  DELETE_PERSON,
  ADD_PERSON
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PERSON:
      return { ...state, persons: action.payload };
    case GET_PERSONS:
      return { ...state, persons: action.payload };
    case ADD_PERSON:
      return { ...state, persons: [action.payload, ...state.persons] };
    case DELETE_PERSON:
      return {
        ...state,
        persons: state.persons.filter(person => person._id !== action.payload)
      };
    default:
      return state;
  }
}

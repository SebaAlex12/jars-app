import {
  ADD_JAR,
  GET_JAR,
  GET_JARS,
  UPDATE_JAR,
  DELETE_JAR,
  JAR_LOADING,
  GET_ERRORS
} from "../actions/types";

const initialState = {
  jars: [],
  jar: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case JAR_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_JARS:
      return {
        ...state,
        jars: action.payload,
        loading: false
      };
    case GET_JAR:
      return {
        ...state,
        jar: action.payload,
        loading: false
      };
    case ADD_JAR:
      return {
        ...state,
        jars: [action.payload, ...state.jars]
      };
    case UPDATE_JAR:
      return {
        ...state,
        jars: [
          action.payload,
          ...state.jars.filter(match => match._id !== action.payload._id)
        ]
      };
    case DELETE_JAR:
      return {
        ...state,
        jars: state.jars.filter(jar => jar._id !== action.payload._id)
      };
    default:
      return state;
  }
}

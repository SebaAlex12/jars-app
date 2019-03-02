import {
  ADD_JAR,
  GET_JAR,
  DELETE_JAR,
  GET_JARS,
  UPDATE_JAR,
  JAR_LOADING,
  ADD_JAR_OPERATION,
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
        jars: [action.payload, ...state.jars],
        loading: false
      };
    case UPDATE_JAR:
      return {
        ...state,
        jars: [
          action.payload,
          ...state.jars.filter(jar => jar._id !== action.payload._id)
        ],
        loading: false
      };
    case ADD_JAR_OPERATION:
      return {
        ...state,
        jars: [
          action.payload,
          ...state.jars.filter(jar => jar._id !== action.payload._id)
        ],
        loading: false
      };
    case DELETE_JAR:
      return {
        ...state,
        jar: action.payload,
        jars: state.jars.filter(jar => jar._id != action.payload),
        loading: false
      };
    default:
      return state;
  }
}

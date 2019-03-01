import {
  ADD_JAR,
  GET_JAR,
  GET_JARS,
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
        jars: [action.payload, ...state.jars]
      };
    case ADD_JAR_OPERATION:
      return {
        ...state,
        jars: [
          action.payload,
          ...state.jars.filter(jar => jar._id !== action.payload._id)
        ]
      };
    default:
      return state;
  }
}

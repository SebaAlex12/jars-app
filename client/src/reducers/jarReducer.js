import {
  ADD_JAR,
  GET_JAR,
  GET_JARS,
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
    default:
      return state;
  }
}

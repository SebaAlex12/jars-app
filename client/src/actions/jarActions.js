import axios from "axios";

import {
  ADD_JAR,
  GET_JAR,
  GET_JARS,
  UPDATE_JAR,
  DELETE_JAR,
  JAR_LOADING,
  GET_ERRORS
} from "./types";

export const addJar = jarData => dispatch => {
  axios
    .post("/api/jars", jarData)
    .then(res =>
      dispatch({
        type: ADD_JAR,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getJars = () => dispatch => {
  axios
    .get("/api/jars")
    .then(res =>
      dispatch({
        type: GET_JARS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_JARS,
        payload: null
      })
    );
};

//Set loading state

export const setPostLoading = () => {
  return {};
};

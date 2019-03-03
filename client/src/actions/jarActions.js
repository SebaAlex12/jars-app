import axios from "axios";

import {
  ADD_JAR,
  GET_JAR,
  DELETE_JAR,
  UPDATE_JAR,
  GET_JARS,
  ADD_JAR_OPERATION,
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

export const getJar = id => dispatch => {
  axios
    .get(`/api/jars/current/${id}`)
    .then(res =>
      dispatch({
        type: GET_JAR,
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

export const updateJar = data => dispatch => {
  axios
    .post(`/api/jars/update/${data.jarId}`, data)
    .then(res =>
      dispatch({
        type: UPDATE_JAR,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const addJarOperation = data => dispatch => {
  axios
    .post(`/api/jars/operation/${data.jarId}`, data)
    .then(res =>
      dispatch({
        type: ADD_JAR_OPERATION,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Delete jar

export const deleteJar = id => dispatch => {
  axios
    .delete(`/api/jars/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_JAR,
        payload: id
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

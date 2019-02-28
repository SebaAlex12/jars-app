import axios from "axios";

import { GET_USER_BY_ID, GET_ERRORS } from "./types";

// get user by id

export const getUserById = id => dispatch => {
  console.log("id");
  axios
    .get(`api/users/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER_BY_ID,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

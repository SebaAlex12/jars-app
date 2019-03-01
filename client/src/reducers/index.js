import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import jarReducer from "./jarReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  jar: jarReducer
});

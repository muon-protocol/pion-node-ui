import { combineReducers } from "redux";
import userReducer from "./usersReducer";

export default combineReducers({
  usersList: userReducer,
});

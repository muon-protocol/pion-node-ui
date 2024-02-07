import { configureStore } from "@reduxjs/toolkit";
import nodeReducer from "./features/nodeInfo";
import verificationReducer from "./features/verification";
import generalReducer from "./features/general";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  nodeReducer,
  verificationReducer,
  generalReducer,
});
export const store = configureStore({
  reducer: { rootReducer },
  devTools: process.env.NODE_ENV !== "production",
});

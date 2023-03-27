import { createWrapper } from "next-redux-wrapper";
import { reducer } from "./reducer";
import { configureStore } from "@reduxjs/toolkit";

// create a makeStore function
// https://github.com/kirill-konshin/next-redux-wrapper
const makeStore = (context) =>
  configureStore({ reducer: reducer, devTools: true });

export const wrapper = createWrapper(makeStore, { debug: true });

import { createStore, combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";

import { composeWithDevTools } from "redux-devtools-extension";

import mainReducer from "./modules/main";

// Combine reducers into their namespaces for access and organization
const rootReducer = combineReducers({
  main: mainReducer,
});

const makeStore = (context) =>
  createStore(rootReducer, context, composeWithDevTools());

export const wrapper = createWrapper(makeStore, { debug: true });

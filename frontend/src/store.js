import { createStore, combineReducers, applyMiddleware } from "redux";
import notificationReducer from "./reducers/notificationReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  notification: notificationReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

console.log("Store", store.getState());

export default store;

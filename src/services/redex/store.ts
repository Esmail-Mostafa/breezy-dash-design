import { createStore } from "redux";
import { orderReducer } from "./Reducer";

// Create the Redux store with the ORDERReducer
export const store = createStore(orderReducer);
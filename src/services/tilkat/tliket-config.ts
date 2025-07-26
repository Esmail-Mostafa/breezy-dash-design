import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice";

const userStore = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default userStore;



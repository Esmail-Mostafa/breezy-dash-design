import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  page1: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  },
  page2: {
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
    department: "",
  },
  page3: {},
  page4: {

  },
};

const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    userStep1: (state, action) => {
      state.page1 = action.payload;
    },
    userStep2: (state, action) => {
      state.page2 = action.payload;
    },
    userStep3: (state, action) => {
      state.page3 = action.payload;
    },
    userStep4: (state, action) => {
      state.page4 = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { userStep1, userStep2, userStep3, userStep4 } = userSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isSidebarOpen: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      console.log("setting user", action.payload);
      state.user = action.payload;
    },
    openSideBar: (state, action) => {
      state.isSidebarOpen = true;
    },
    closeSideBar: (state, action) => {
      state.isSidebarOpen = false;
    },
  },
});

export const { setUserCredentials, openSideBar, closeSideBar } =
  authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: true,
  isSidebarOpen: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {},
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

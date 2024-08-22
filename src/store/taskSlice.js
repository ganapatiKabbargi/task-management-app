import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks = [...state.tasks, ...action.payload];
    },
    fetchTask: (state, action) => {
      state.tasks = action.payload;
    },
    deleteTask: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, fetchTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;

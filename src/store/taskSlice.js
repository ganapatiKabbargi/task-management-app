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
    updateTask: (state, action) => {
      state.tasks = action.payload;
    },
    restoreTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, fetchTask, deleteTask, updateTask, restoreTasks } =
  taskSlice.actions;
export default taskSlice.reducer;

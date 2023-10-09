import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  list: [{id: 1, name: 'Luong Dat'}],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const user = {
        id: nanoid(),
        name: action.payload,
      };
      state.list.push(user);
    },
    removeUser: (state, action) => {
      state.list = state.list.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
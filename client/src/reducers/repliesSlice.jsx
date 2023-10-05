import { createSlice } from '@reduxjs/toolkit';

const repliesSlice = createSlice({
  name: 'replies',
  initialState: [],
  reducers: {
    addReply: (state, action) => {
      state.push(action.payload);
    },
    setReplies: (state, action) => {
      return action.payload;
    },
  },
});

export const { addReply, setReplies } = repliesSlice.actions;
export default repliesSlice.reducer;

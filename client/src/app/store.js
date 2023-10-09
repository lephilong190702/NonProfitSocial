import { configureStore } from "@reduxjs/toolkit";

import userReducer from '../features/user/userSlice';
import repliesReducer from '../reducers/repliesSlice';

const rootReducer = {
  user: userReducer,
  replies: repliesReducer,
}

export const store = configureStore({
  reducer: rootReducer,
  
});
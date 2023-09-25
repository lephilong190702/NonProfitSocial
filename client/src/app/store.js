import { configureStore } from "@reduxjs/toolkit";

import userReducer from '../features/user/userSlice';

const rootReducer = {
  user: userReducer,
}

export const store = configureStore({
  reducer: rootReducer,
  
});
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import lectureSlice from "./lectureSlice";

export const store = configureStore({
  reducer: {
    userDetails: userSlice,
    lecture: lectureSlice,
  },
});

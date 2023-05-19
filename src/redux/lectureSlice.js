import { createSlice } from "@reduxjs/toolkit";

export const lectureSlice = createSlice({
  name: "lectureSlice",
  initialState: {
    lecture_id: sessionStorage.getItem("lecture_id"),
  },
  reducers: {
    setLectureId: (state, action) => {
      state.lecture_id = action.payload;
    },
  },
});

export const { setLectureId } = lectureSlice.actions;

export default lectureSlice.reducer;

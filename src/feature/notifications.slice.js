import {createSlice} from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notificationsData: [],
  },

  reducers: {
    getNotifications: (state, {payload}) => {
      state.notificationsData = payload;
    },
  },
});

export const {getNotifications} = notificationsSlice.actions;
export default notificationsSlice.reducer;

import {createSlice} from "@reduxjs/toolkit";

export const promotionsSlice = createSlice({
  name: "promotions",
  initialState: {
    militaryGeneralPromotions: [],
    militaryPromotions: [],
    militaryDemotions: [],
  },

  reducers: {
    getMilitaryGeneralPromotions: (state, {payload}) => {
      state.militaryGeneralPromotions = payload;
    },
    getMilitaryPromotions: (state, {payload}) => {
      state.militaryPromotion = payload;
    },
    getMilitaryDemotions: (state, {payload}) => {
      state.militaryDemotions = payload;
    },
  },
});

export const {
  getMilitaryGeneralPromotions,
  getMilitaryPromotions,
  getMilitaryDemotions,
} = promotionsSlice.actions;
export default promotionsSlice.reducer;

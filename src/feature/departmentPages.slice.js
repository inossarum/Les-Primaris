import {createSlice} from "@reduxjs/toolkit";

export const departmentPagesSlice = createSlice({
  name: "departmentPages",
  initialState: {
    isAddingNewLocation: false,
    departmentPageActive: "",
    departmentDisplayedBlock: "central",
    departmentScreensToDownload: [],
    explorationDepartmentLocations: [],
  },
  reducers: {
    setIsAddingNewLocation: (state, {payload}) => {
      state.isAddingNewLocation = payload;
    },
    setDepartmentPageActive: (state, {payload}) => {
      state.departmentPageActive = payload;
    },
    setDepartmentDisplayedBlock: (state, {payload}) => {
      state.departmentDisplayedBlock = payload;
    },
    setDepartmentScreensToDownload: (state, {payload}) => {
      state.departmentScreensToDownload = [
        ...state.departmentScreensToDownload,
        payload,
      ];
    },
    resetDepartmentScreensToDownload: (state, {payload}) => {
      state.departmentScreensToDownload =
        state.departmentScreensToDownload.splice(
          state.departmentScreensToDownload.length
        );
    },
    removeDepartmentScreensToDownload: (state, {payload}) => {
      state.departmentScreensToDownload = [
        ...state.departmentScreensToDownload,
      ].filter((screen) => screen.URL !== payload);
    },
    getExplorationDepartmentLocations: (state, {payload}) => {
      state.explorationDepartmentLocations = payload;
    },
  },
});

export const {
  setIsAddingNewLocation,
  setDepartmentPageActive,
  setDepartmentDisplayedBlock,
  setDepartmentScreensToDownload,
  removeDepartmentScreensToDownload,
  resetDepartmentScreensToDownload,
  getExplorationDepartmentLocations,
} = departmentPagesSlice.actions;
export default departmentPagesSlice.reducer;

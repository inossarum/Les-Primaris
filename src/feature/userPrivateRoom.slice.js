import {createSlice} from "@reduxjs/toolkit";

export const userPrivateRoomSlice = createSlice({
  name: "userPrivateRoom",
  initialState: {
    logoToDownload: null,
    bannerToDownload: null,
    ships: null,
    selectedShip: false,
    selectedShipCardInfos: [],
    ownedShipsList: [],
    ownerShipDatas: {},
    privateRoomShipsListSearchResult: [],
  },
  reducers: {
    getRSIShips: (state, {payload}) => {
      state.ships = payload;
    },
    getOwnedShipsList: (state, {payload}) => {
      state.ownedShipsList = payload;
    },
    setSelectedShip: (state, {payload}) => {
      state.selectedShip = payload[0];
      state.selectedShipCardInfos = payload[1];
    },
    setPrivateRoomShipsListSearchResult: (state, {payload}) => {
      state.privateRoomShipsListSearchResult = payload;
    },
    setShipOwnerDatas: (state, {payload}) => {
      state.ownerShipDatas = payload;
    },
    setLogoToDownload: (state, {payload}) => {
      state.logoToDownload = payload;
    },
    setBannerToDownload: (state, {payload}) => {
      state.bannerToDownload = payload;
    },
  },
});

export const {
  setLogoToDownload,
  setBannerToDownload,
  getRSIShips,
  getOwnedShipsList,
  setSelectedShip,
  setPrivateRoomShipsListSearchResult,
  setShipOwnerDatas,
} = userPrivateRoomSlice.actions;
export default userPrivateRoomSlice.reducer;

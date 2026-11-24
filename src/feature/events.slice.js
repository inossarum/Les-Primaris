import {createSlice} from "@reduxjs/toolkit";

export const eventsSlice = createSlice({
  name: "events",
  initialState: {
    militaryEvents: [],
    militaryEventsArchives: [],
    civilianEvents: [],
    civilianEventsArchives: [],
    eventDetails: null,
    eventDetailsWindowActive: "",
    eventShipsListSearchResult: [],
    playersList: [],
    isBringingVehicle: false,
    actualEventShipSelected: null,
    eventJobSelectionActive: false,
    eventUserSearchingActive: false,
  },

  reducers: {
    getMilitaryEventsList: (state, {payload}) => {
      state.militaryEvents = payload;
    },
    getMilitaryEventsArchivesList: (state, {payload}) => {
      state.militaryEventsArchives = payload;
    },
    getCivilianEventsList: (state, {payload}) => {
      state.civilianEvents = payload;
    },
    getEventSearchShipsList: (state, {payload}) => {
      state.eventShipsListSearchResult = payload;
    },

    getCivilianEventsArchivesList: (state, {payload}) => {
      state.civilianEventsArchives = payload;
    },
    getEventDetails: (state, {payload}) => {
      state.eventDetails = payload;
    },
    setEventDetailsWindowActive: (state, {payload}) => {
      state.eventDetailsWindowActive = payload;
    },
    setActualEventShipSelected: (state, {payload}) => {
      state.actualEventShipSelected = payload;
    },

    setIsBringingVehicle: (state, {payload}) => {
      state.isBringingVehicle = payload;
    },
    setEventJobSelectionActive: (state, {payload}) => {
      state.eventJobSelectionActive = payload;
    },
    setEventUserSearchingActive: (state, {payload}) => {
      state.eventUserSearchingActive = payload;
    },
  },
});

export const {
  getMilitaryEventsList,
  getMilitaryEventsArchivesList,
  getCivilianEventsList,
  getCivilianEventsArchivesList,
  getEventDetails,
  setEventDetailsWindowActive,
  getEventSearchShipsList,
  setIsBringingVehicle,
  setActualEventShipSelected,
  setEventJobSelectionActive,
  setEventUserSearchingActive,
} = eventsSlice.actions;
export default eventsSlice.reducer;

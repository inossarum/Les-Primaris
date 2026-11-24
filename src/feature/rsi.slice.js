import {createSlice} from "@reduxjs/toolkit";

export const rsiSlice = createSlice({
  name: "encyclopedia",
  initialState: {
    ships: null,
    shipDetail: null,
    shipImages: null,
    shipVideos: null,
    shipVariants: null,
    shipsSearchResult: [],
    shops: [],
    shopsItems: null,
    shopsItemsFilterResult: null,
    shopsSearchResult: [],
    stations: null,
    stationsSearchResult: [],
    celestialObjects: null,
    celestialObjectsSearchResult: [],
    actualCelestialObjectMoons: null,
    actualCelestialObjectStations: null,
    actualCelestialObjectOutposts: null,
    actualCelestialObjectLandingZones: null,
    starSystems: null,
    starSystemsSearchResult: [],
    encyclopediaPage: "home",
  },
  reducers: {
    getRSIShips: (state, {payload}) => {
      state.ships = payload;
    },
    getRSIShipDetail: (state, {payload}) => {
      state.shipDetail = payload;
    },
    getRSIShipImages: (state, {payload}) => {
      state.shipImages = payload;
    },
    getRSIShipVideos: (state, {payload}) => {
      state.shipVideos = payload;
    },
    getRSIShipVariants: (state, {payload}) => {
      state.shipVariants = payload;
    },
    setRSIShipsSearchResult: (state, {payload}) => {
      state.shipsSearchResult = state.shipsSearchResult.filter(
        (ship) => ship.id !== payload.id
      );
      state.shipsSearchResult.push(payload);
    },

    getRSIShops: (state, {payload}) => {
      if (typeof payload === "string") {
        state.shops = payload;
      } else {
        state.shops = Object.values(payload);
      }
    },
    clearRSIShops: (state) => {
      state.shops = [];
    },
    getRSIShopsItems: (state, {payload}) => {
      state.shopsItems = payload;
    },
    setRSIShopsItemsFilterResult: (state, {payload}) => {
      state.shopsItemsFilterResult = payload;
    },

    setRSIShopsSearchResult: (state, {payload}) => {
      state.shopsSearchResult = state.shopsSearchResult.filter(
        (shops) => shops.slug !== payload.slug
      );

      state.shopsSearchResult.push(payload);
    },
    getRSIStations: (state, {payload}) => {
      state.stations = payload;
    },
    getRSIActualCelestialObjectInterestPoints: (state, {payload}) => {
      state.actualCelestialObjectStations = payload[0].filter(
        (station) =>
          (station.celestialObject.name === payload[1].name &&
            station.type === "station") ||
          (station.celestialObject.name === payload[1].name &&
            station.type === "asteroid_station")
      );
      state.actualCelestialObjectOutposts = payload[0].filter(
        (station) =>
          station.celestialObject.name === payload[1].name &&
          station.type === "outpost"
      );

      state.actualCelestialObjectLandingZones = payload[0].filter(
        (station) =>
          station.celestialObject.name === payload[1].name &&
          station.type === "landing_zone"
      );
    },
    getRSIActualCelestialObjectMoons: (state, {payload}) => {
      state.actualCelestialObjectMoons = payload[0].filter(
        (celestialObject) =>
          celestialObject?.parent?.name === payload[1].name &&
          celestialObject.type === "Satellite"
      );
    },

    setRSIStationsSearchResult: (state, {payload}) => {
      state.stationsSearchResult = state.stationsSearchResult.filter(
        (station) => station.slug !== payload.slug
      );

      state.stationsSearchResult.push(payload);
    },
    clearRSISearchResult: (state) => {
      state.shipsSearchResult = state.shipsSearchResult.splice(
        state.shipsSearchResult.length
      );
      state.stationsSearchResult = state.stationsSearchResult.splice(
        state.stationsSearchResult.length
      );
      state.celestialObjectsSearchResult =
        state.celestialObjectsSearchResult.splice(
          state.celestialObjectsSearchResult.length
        );
      state.starSystemsSearchResult = state.starSystemsSearchResult.splice(
        state.starSystemsSearchResult.length
      );
    },
    getRSICelestialObjects: (state, {payload}) => {
      state.celestialObjects = payload;
    },
    setRSICelestialObjectsSearchResult: (state, {payload}) => {
      state.celestialObjectsSearchResult =
        state.celestialObjectsSearchResult.filter(
          (celestialObject) => celestialObject.slug !== payload.slug
        );

      state.celestialObjectsSearchResult.push(payload);
    },
    getRSIStarSystems: (state, {payload}) => {
      state.starSystems = payload;
    },
    setRSIStarSystemsSearchResult: (state, {payload}) => {
      state.starSystemsSearchResult = state.starSystemsSearchResult.filter(
        (station) => station.slug !== payload.slug
      );
      state.starSystemsSearchResult.push(payload);
    },

    getEncyclopediaPage: (state, {payload}) => {
      state.encyclopediaPage = payload;
    },
  },
});

export const {
  getRSIShips,
  getRSIShipDetail,
  getRSIShipImages,
  getRSIShipVideos,
  getRSIShipVariants,
  setRSIShipsSearchResult,
  getRSIShops,
  clearRSIShops,
  getRSIShopsItems,
  setRSIShopsItemsFilterResult,
  setRSIShopsSearchResult,
  getRSIStations,
  setRSIStationsSearchResult,
  getRSICelestialObjects,
  getRSIActualCelestialObjectInterestPoints,
  getRSIActualCelestialObjectMoons,
  setRSICelestialObjectsSearchResult,
  getRSIStarSystems,
  setRSIStarSystemsSearchResult,
  clearRSISearchResult,
  getEncyclopediaPage,
} = rsiSlice.actions;
export default rsiSlice.reducer;

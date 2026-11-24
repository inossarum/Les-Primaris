import {createSlice} from "@reduxjs/toolkit";

export const windowSlice = createSlice({
    name: "window",
    initialState: {
        windowActive: false,
        shipSelectionActive: false,
        crewSelectionActive: false,
        jobSelectionActive: false,
        celestialCardContentDeployed: "",
        starSystemPath: "",
        celestialObjectPlanetPath: "",
        celestialObjectMoonPath: "",
        stationPath: "",
        setFleetCardActive: {},
    },
    reducers: {
        windowToggleActive: (state, payload) => {
            state.windowActive = payload;
        },
        setShipSelectionActive: (state, {payload}) => {
            state.shipSelectionActive = payload;
        },
        setCrewSelectionActive: (state, {payload}) => {
            state.crewSelectionActive = payload;
        },
        setJobSelectionActive: (state, {payload}) => {
            state.jobSelectionActive = payload;
        },
        celestialCardContentDeployed: (state, {payload}) => {
            state.celestialCardContentDeployed = payload;
        },
        stationPath: (state, {payload}) => {
            state.stationPath = payload;
        },
        celestialObjectMoonPath: (state, {payload}) => {
            state.celestialObjectMoonPath = payload;
        },
        celestialObjectPlanetPath: (state, {payload}) => {
            state.celestialObjectPlanetPath = payload;
        },
        starSystemPath: (state, {payload}) => {
            state.starSystemPath = payload;
        },
        setFleetCardActive: (state, {payload}) => {
            state.setFleetCardActive = {
                id: payload[0],
                state: payload[1],
            };
        },
    },
});

export const {
    windowToggleActive,
    setShipSelectionActive,
    setCrewSelectionActive,
    setJobSelectionActive,
    celestialCardContentDeployed,
    stationPath,
    celestialObjectMoonPath,
    celestialObjectPlanetPath,
    starSystemPath,
    setFleetCardActive,
} = windowSlice.actions;
export default windowSlice.reducer;

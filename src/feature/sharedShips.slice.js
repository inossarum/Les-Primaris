import {createSlice} from "@reduxjs/toolkit";

export const sharedShipsSlice = createSlice({
    name: "sharedShips",
    initialState: {
        sharedShipsList: [],
        actualShipSelected: null,
        // Departments ships list
        staffShips: [],
        aerospatialShips: [],
        logisticsShips: [],
        centralAdministrationShips: [],
        militaryTrainingCenterShips: [],
        militaryResearchShips: [],
        militaryMedicineShips: [],
        explorationShips: [],
        tourismShips: [],
        tradeAndTransportShips: [],
        industryShips: [],
        sciencesShips: [],
        medicineShips: [],
        cultureAndSportsShips: [],
        // Departments ships list
        firstReconFleet: [],
        firstAttackFleet: [],
        hierachicalShipSelected: null,
    },
    reducers: {
        getSharedShipsList: (state, {payload}) => {
            state.sharedShipsList = payload;
            // Military departments list
            state.staffShips = state.sharedShipsList.filter(
                (sharedShip) => sharedShip?.department === "staff"
            );
            state.aerospatialShips = state.sharedShipsList.filter(
                (sharedShip) => sharedShip?.department === "aerospatial"
            );
            state.logisticsShips = state.sharedShipsList.filter(
                (sharedShip) => sharedShip?.department === "logistics"
            );
            state.militaryTrainingCenterShips = state.sharedShipsList.filter(
                (sharedShip) =>
                    sharedShip?.department === "militaryTrainingCenter"
            );
            state.militaryResearchShips = state.sharedShipsList.filter(
                (sharedShip) => sharedShip?.department === "militaryResearch"
            );
            state.militaryMedicineShips = state.sharedShipsList.filter(
                (sharedShip) => sharedShip?.department === "militaryMedicine"
            );

            // Civilian departments list
            state.centralAdministrationShips = state.sharedShipsList.filter(
                (sharedShip) =>
                    sharedShip?.department === "central administration"
            );
            state.academyShips = state.sharedShipsList.filter(
                (sharedShip) => sharedShip?.department === "academy"
            );
            state.explorationShips = state.sharedShipsList.filter(
                (sharedShip) => sharedShip?.department === "exploration"
            );
            state.tourismShips = state.sharedShipsList.filter(
                (sharedShip) => sharedShip?.department === "tourism"
            );
            state.tradeAndTransportShips = state.sharedShipsList.filter(
                (sharedShip) => sharedShip?.department === "trade & transport"
            );
            state.industryShips = state.sharedShipsList.filter(
                (sharedShip) => sharedShip?.department === "industry"
            );
            state.sciencesShips = state.sharedShipsList.filter(
                (sharedShip) => sharedShip?.department === "sciences"
            );
            state.medicineShips = state.sharedShipsList.filter(
                (sharedShip) => sharedShip?.department === "medicine"
            );
            state.cultureAndSportsShips = state.sharedShipsList.filter(
                (sharedShip) => sharedShip?.department === "culture & sports"
            );
        },

        getSharedShipsFleet: (state, {payload}) => {
            state.sharedShipsList = payload;
            // Military departments list

            state.firstReconFleet = state.sharedShipsList.filter(
                (sharedShip) => sharedShip?.fleet === "EX1Rc."
            );
            state.firstAttackFleet = state.sharedShipsList.filter(
                (sharedShip) => sharedShip?.fleet === "EX1At."
            );
        },

        setActualShipSelected: (state, {payload}) => {
            state.actualShipSelected = payload;
        },

        setHierarchicalShipSelected: (state, {payload}) => {
            state.hierarchicalShipSelected = payload;
        },
    },
});

export const {
    getSharedShipsList,
    setActualShipSelected,
    getSharedShipsFleet,
    setHierarchicalShipSelected,
} = sharedShipsSlice.actions;
export default sharedShipsSlice.reducer;

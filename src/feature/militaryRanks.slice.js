import {createSlice} from "@reduxjs/toolkit";

export const militaryRanksSlice = createSlice({
    name: "militaryRanks",
    initialState: {
        militaryRanks: [],
        chosenRank: "",
    },
    reducers: {
        getMilitaryRanks: (state, {payload}) => {
            state.militaryRanks = payload;
        },
        setChosenRank: (state, {payload}) => {
            state.chosenRank = payload;
        },
    },
});

export const {getMilitaryRanks, setChosenRank} = militaryRanksSlice.actions;
export default militaryRanksSlice.reducer;

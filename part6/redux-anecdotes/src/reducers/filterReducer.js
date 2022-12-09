import {createSlice} from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: "",
    reducers: {
        changeFilter(state, action) {
            return action.payload
        },
        clearFilter(state, action) {
            return ""
        }
    }
})

export const {changeFilter, clearFilter} = filterSlice.actions
export default filterSlice.reducer
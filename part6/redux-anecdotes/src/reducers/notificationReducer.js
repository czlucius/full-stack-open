import {createSlice} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
        name: "notification",
        initialState: "",
        reducers: {
            pushNotification(state, action) {
                return action.payload
            },
            clearNotification(state, action) {
                return ""
            },
            votedFor(state, action) {
                console.log("in voted for, action is ",action)
                return `you voted '${action.payload}'`
            }
        }
    }
)

export const {pushNotification, clearNotification, votedFor} = notificationSlice.actions
export default notificationSlice.reducer
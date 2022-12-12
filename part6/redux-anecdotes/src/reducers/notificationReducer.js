import {createSlice} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
        name: "notification",
        initialState: "",
        reducers: {
            setNotification(state, action) {
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

export const pushNotification = (notification, timeout) => {
    return async dispatch => {
        dispatch(setNotification(notification))
        setTimeout(() => {
            dispatch(clearNotification())
        }, timeout)
    }
}

export const {setNotification, clearNotification, votedFor} = notificationSlice.actions
export default notificationSlice.reducer
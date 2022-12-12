import {configureStore} from "@reduxjs/toolkit"
import anecdoteReducer, {createAnecdote, setAnecdotes} from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";
import anecdoteService from "./services/anecdotes";

const store = configureStore({
    reducer: {
        anecdote: anecdoteReducer,
        notification: notificationReducer,
        filter: filterReducer
    }
})


export default store
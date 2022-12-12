import anecdoteService from "../services/anecdotes"
import {pushNotification} from "./notificationReducer";

const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const initialState = []


const INCREMENT_VOTES = "INCREMENT_VOTES"
const CREATE_ANECDOTE = "CREATE_ANECDOTE"
const SET_ANECDOTES = "SET_ANECDOTES"
const APPEND_ANECDOTE = "APPEND_ANECDOTE"


// If needed, I will change this to use slices and Redux Toolkit.
const reducer = (state = initialState, action) => {
    let newState = [...state]
    switch (action.type) {
        case INCREMENT_VOTES:
            for (let i = 0; i < newState.length; i++) {
                if (state[i].id === action.id) {
                    newState[i] = {
                        ...state[i],
                        votes: state[i].votes + 1
                    }
                }
            }
            break
        case CREATE_ANECDOTE:
            newState.push(asObject(action.content))
            break
        case SET_ANECDOTES:
            newState = action.newState
            break
        case APPEND_ANECDOTE:
            newState = state.concat(action.anecdote)
            break
        default:
            return newState
    }


    return newState
}

export const setAnecdotes = (anecdotes) => {
    return {
        type: SET_ANECDOTES,
        newState: anecdotes
    }
}

export const incrementVotes = (id) => {
    console.log("vote increment, id is", id)
    return {
        type: INCREMENT_VOTES,
        id
    }
}

export function createAnecdote(content) {
    return {
        type: CREATE_ANECDOTE,
        content
    }
}

function appendAnecdote(anecdote) {
    return {
        type: APPEND_ANECDOTE,
        anecdote
    }
}

export function saveAnecdote(content) {
    return async dispatch => {
        const anecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(anecdote))
    }
}



export function initialiseAnecdotes() {
    return async dispatch => {
        anecdoteService.getAll()
            .then(anecdotes => {
                dispatch(setAnecdotes(anecdotes))
            })
    }
}

export function saveAndIncrementVotes(id) {
    return async (dispatch, getState) => {
        console.log("current state in thunk is", getState())
        dispatch(incrementVotes(id))
        const anecdotes = getState().anecdote
        const theAnecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(pushNotification(`you voted '${theAnecdote.content}'`, 5000))

        const response = await anecdoteService.modifyObject(id, theAnecdote)
        console.log("thunk: awaited response from modify obj", response)
    }
}


export default reducer

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

const initialState = anecdotesAtStart.map(asObject)

const INCREMENT_VOTES = "INCREMENT_VOTES"
const CREATE_ANECDOTE = "CREATE_ANECDOTE"

const reducer = (state = initialState, action) => {
    const newState = [...state]
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
            newState.sort((a, b) => b.votes - a.votes)
            break
        case CREATE_ANECDOTE:
            newState.push(asObject(action.content))
            break
        default:
            console.error("No such action type!")
    }


    return newState
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


export default reducer

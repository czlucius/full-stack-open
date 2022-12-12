import {useDispatch, useSelector} from "react-redux";
import {saveAndIncrementVotes} from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        console.log(state)
        return state.anecdote.filter(anecdote => anecdote.content.toLowerCase().startsWith(state.filter.toLowerCase()))
    })

    const vote = (id) => {
        dispatch(saveAndIncrementVotes(id))
    }
    console.log("Anecdotes is ", anecdotes)
    anecdotes.sort((a, b) => b.votes - a.votes)

    return anecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>
    )
}

export default AnecdoteList
import {useDispatch, useSelector} from "react-redux";
import {incrementVotes} from "../reducers/anecdoteReducer";
import {clearNotification, votedFor} from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        console.log(state)
        return state.anecdote.filter(anecdote => anecdote.content.toLowerCase().startsWith(state.filter.toLowerCase()))
    })

    const vote = (id) => {
        dispatch(incrementVotes(id))
        dispatch(votedFor(anecdotes.find(anecdote => anecdote.id === id).content))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }
    console.log("Anecdotes is ", anecdotes)
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
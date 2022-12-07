import {useState} from "react";
import {useDispatch} from "react-redux";
import {createAnecdote} from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
    const [newAnecdote, setNewAnecdote] = useState("")
    const dispatch = useDispatch()
    const anecdoteEventHook = (event) => {
        setNewAnecdote(event.target.value)
    }

    const create = (event) => {
        event.preventDefault()
        dispatch(createAnecdote(newAnecdote))
        setNewAnecdote("")
    }

    return (
        <>
            <h2>create new</h2>
            <form>
                <div><input value={newAnecdote} onChange={anecdoteEventHook}/></div>
                <button onClick={create}>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
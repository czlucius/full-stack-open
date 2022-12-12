import {useState} from "react";
import {useDispatch} from "react-redux";
import {createAnecdote, saveAnecdote} from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = (props) => {
    const [newAnecdote, setNewAnecdote] = useState("")
    const dispatch = useDispatch()
    const anecdoteEventHook = (event) => {
        setNewAnecdote(event.target.value)
    }

    const create = async (event) => {
        event.preventDefault()
        const content = newAnecdote
        setNewAnecdote("")
        saveAnecdote(content)
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
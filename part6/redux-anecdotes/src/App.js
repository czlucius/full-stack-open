import {useDispatch, useSelector} from 'react-redux'
import {incrementVotes, createAnecdote} from "./reducers/anecdoteReducer";
import {useState} from "react";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";


const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()


    return (
        <div>
            <h2>Anecdotes</h2>
            <AnecdoteList/>
            <AnecdoteForm/>
        </div>
    )
}



export default App
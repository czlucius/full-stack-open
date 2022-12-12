import {useDispatch, useSelector} from 'react-redux'
import {incrementVotes, createAnecdote, setAnecdotes, initialiseAnecdotes} from "./reducers/anecdoteReducer";
import {useEffect, useState} from "react";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import anecdoteService from "./services/anecdotes";
import store from "./store";


const App = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initialiseAnecdotes())
    }, [dispatch])


    return (
        <div>
            <Notification/>
            <Filter/>
            <h2>Anecdotes</h2>
            <AnecdoteList/>
            <AnecdoteForm/>
        </div>
    )
}



export default App
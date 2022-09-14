import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {Filter} from "./components/Filter";
import {CountriesInfoList} from "./components/CountriesInfoList";
import axios from "axios";

function useEventState(initialState) {
    let state = useState(initialState)
    const setState = state[1]
    state = state.concat(
        (event) => {
            console.log("value modified", event.target.value)
            setState(event.target.value)
        }
    )
    return state
}

const App = (props) => {
    const [query, setQuery, queryEventHook] = useEventState("")
    const [countries, setCountries] = useState([])
    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then(response => {
                setCountries(response.data)
                console.log(countries)
            })
    }, [])
    console.log(countries)


    if (countries.length > 0) return (<>
            <Filter query={query} queryChangedEventHook={queryEventHook}/>
            <CountriesInfoList countries={countries} filter={query} setFilter={setQuery}/>
        </>
    )
    else return (<></>) // Do not load if no countries (have not fetched data)
}

export default App;

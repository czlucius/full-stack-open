import {useEffect, useState} from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import personsService from "./services/persons"


const App = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        personsService.getAll().then((response => {
            const persons_data = response.data
            console.log("Response: ", persons_data)
            setPersons(persons_data)
        }))
    }, [])

    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [searchQuery, setSearchQuery] = useState('')


    const nameChanged = (event) => {
        console.log("name changed: event received: ", event)
        setNewName(event.target.value)

    }
    const phoneChanged = (event) => {
        console.log("phone changed: event received: ", event)
        setNewPhone(event.target.value)
    }

    const searchQueryChanged = (event) => {
        console.log("search query changed: event received: ", event)
        setSearchQuery(event.target.value)
    }

    const clickHandler = (event) => {
        event.preventDefault()
        console.log("clickhandler: event received: ", event)
        let match = false

        for (const person of persons) {
            if (person.name === newName) {
                match = true
                break
            }
        }
        let to_add = true
        if (match) {
            to_add = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        }

        if (to_add) {

            const newObj = {name: newName, number: newPhone, id: persons.length + 1}


            personsService.create(newObj).then(response => {
                setPersons(persons.concat(response.data))

                // Clear the input box.
                setNewName("")
                setNewPhone("")
            })

        }
    }

    const deleteHandler = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            console.log("deleting ", person)
            personsService.remove(person.id)
                .then(response => {
                    setPersons(persons.filter(specific => specific.id !== person.id))
                })
        }
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchQuery={searchQuery} searchQueryChanged={searchQueryChanged}/>
            <h3>Add a new</h3>
            <PersonForm newName={newName} onNameChange={nameChanged} newPhone={newPhone} onPhoneChange={phoneChanged}
                        submitForm={clickHandler}/>
            <h3>Numbers</h3>
            <Persons persons={persons} searchQuery={searchQuery} deleteHandler={deleteHandler}/>
        </div>
    )
}

export default App
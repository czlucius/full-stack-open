import {useEffect, useState} from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import personsService from "./services/persons"
import { Notification } from './components/Notification.js'

function useEventState(initialState) {
    const [state, setState] = useState(initialState)
    const stateChangedEvent = (event) => {
        setState(event.target.value)
    }
    return [state, setState, stateChangedEvent]
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [notification, setNotification] = useState({message: null, error: false})

    useEffect(() => {
        personsService.getAll().then((response => {
            const persons_data = response.data
            console.log("Response: ", persons_data)
            setPersons(persons_data)
        }))
    }, [])

    const [newName, setNewName, nameChanged] = useEventState('')
    const [newPhone, setNewPhone, phoneChanged] = useEventState('')
    const [searchQuery, setSearchQuery, searchQueryChanged] = useEventState('')

    const addPerson = (person) => {
        
        personsService.create(person).then(response => {
            setPersons(persons.concat(response.data))

            // Clear the input box.
            setNewName("")
            setNewPhone("")

            // Show notification
            setNotification({...notification, message:`Added ${person.name}`, error: false})
            setTimeout(() => {setNotification({...notification, message: null})}, 5000)
        })

    }

    const updatePerson = (person) => {
        personsService.update(person.id, person)
            .then(response => {
                const newPersons = [...persons].map(specific => {
                    if (specific.id === person.id) {
                        return person
                    } else {return specific}
                })
                setPersons(newPersons)

                // Clear the input box.
                setNewName("")
                setNewPhone("")

                // Show notification
                setNotification({...notification, message:`Modified ${person.name}`, error: false})
                setTimeout(() => {setNotification({...notification, message: null})}, 5000)
        
            }).catch(response=>{
                setNotification({
                    message: `Information of ${person.name} has already been removed from server`,
                    error: true
                })
    
                setTimeout(() => {setNotification({...notification, message: null, error:false})}, 5000)
    
            })
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
        let replace = false
        if (match) {
            to_add = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            replace = to_add
        }

        if (to_add && !replace) {

            const newObj = {name: newName, number: newPhone, id: persons.length + 1}

            addPerson(newObj, replace)
        } else if (to_add && replace) {
            const newObj = {name: newName, number: newPhone, id: persons.find(specific => specific.name === newName).id}
            updatePerson(newObj)
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
//for testing only:
 /*navigator.causeError = () => {
        setNotification({
            message: `Information of person.name has already been removed from server`,
            error: true
        })

        setTimeout(() => {setNotification({...notification, message: null, error:false})}, 5000)
    }*/


    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification.message} error={notification.error}/>
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

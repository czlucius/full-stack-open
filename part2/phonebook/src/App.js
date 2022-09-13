import {useEffect, useState} from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import axios from "axios";



const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response=> {
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
    if (match) {
      alert(`${newName} is already added to phonebook`)
    } else {
      
      const newObj = { name: newName, number: newPhone, id: persons.length + 1 }
      setPersons(persons.concat(newObj))


    }
    // Clear the input box.
    setNewName("")
    setNewPhone("")
  
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchQuery={searchQuery } searchQueryChanged={searchQueryChanged}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} onNameChange={nameChanged} newPhone={newPhone} onPhoneChange={phoneChanged} submitForm={clickHandler}/>
      <h3>Numbers</h3>
      <Persons persons={persons} searchQuery={searchQuery}/>
        </div>
  )
}

export default App
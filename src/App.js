import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const HTTP_NOT_FOUND = 404

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification ] = useState({ type:null, message:null })

  useEffect(() =>{
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const triggerNotification = (type, message) => {
    setNotification({
      type,
      message
    })
    setTimeout(() => setNotification({
      type: null,
      message: null
    }), 3000)
  }

  const createPerson = (newPerson) => {
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        triggerNotification('success', `Added ${newPerson.name}`)
      }).catch((error) => {
        console.log(error)
        triggerNotification(
          'error',
          'Oops there was an error, try again later'
        )
      })
  }

  const updatePerson = (updatedPerson) => {
    personService
      .update(updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person =>
          person.id !== returnedPerson.id ? person : returnedPerson
        ))
        setNewName('')
        setNewNumber('')
        triggerNotification('success', `Updated ${updatedPerson.name}`)
      }).catch((error) => {
        console.log(error)
        if (error.response.status === HTTP_NOT_FOUND) {
          triggerNotification(
            'error',
            `The person ${updatedPerson.name} does not exist anymore`
          )
          setPersons(persons.filter(person => person.id !== updatedPerson.id))
        }
      })
  }

  const removePerson = (id, name) => {
    const canDelete = window.confirm(`Delete ${name} ?`)
    if (canDelete) {
      personService
        .remove(id)
        .then(() => {
          const newPersons = persons.filter(person => person.id !== id)
          setPersons(newPersons)
          triggerNotification('success', `Deleted ${name}`)
        }).catch((error) => {
          console.log(error)
          if (error.response.status === HTTP_NOT_FOUND) {
            triggerNotification(
              'error',
              `Information of ${name} has already been removed from server`
            )
            setPersons(persons.filter(person => person.id !== id))
          }
        })
    }
  }

  const addName = (event) => {
    event.preventDefault()
    
    const personExists = persons.find((person) => person.name === newName)

    if (personExists) {
      const shouldUpdate = window.confirm(`${personExists.name} is already added to phonebook, replace the old number with a new one?`)
      if (shouldUpdate) {
        const updatedPerson = {
          ...personExists,
          name: newName,
          number: newNumber,
        }
        updatePerson(updatedPerson)
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      createPerson(newPerson)
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        type={notification.type}
        message={notification.message}
      />
      <Filter value={newFilter} onChangeHandler={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm 
        onSubmitHandler={addName}
        nameValue={newName}
        nameChangeHandler={handleNameChange}
        numberValue={newNumber}
        numberChangeHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={newFilter}
        onDelete={removePerson}
      />
    </div>
  )
}

export default App
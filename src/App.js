import React, { useEffect, useState } from 'react'
import personService from './services/personService'
import PersonForm from './components/PersonForm'
import InputField from './components/InputField'
import PersonList from './components/PersonList'


const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterStr, setFilterStr ] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then( initalPersons => setPersons(initalPersons))
  }, []);

  const personsToShow = persons.filter((person) => person.name.toLowerCase().indexOf(filterStr.toLowerCase()) !== -1);

  const addEntry = (event) => {
    event.preventDefault();
    if(persons.some((person) => person.name === newName)) {
      const oldEntry = persons.find((person)=> person.name === newName);
      if(oldEntry.number === newNumber) {
        alert(`${newName} has already been added to the phonebook`);
        return;
      } 
      const updateConsent = window.confirm(`${newName} is already in the phonebook, would you like to replace their old one with the new one?`)
      if(!updateConsent) return;
      const updatedEntry = {
        name: newName,
        number: newNumber
      }
      personService
        .update(oldEntry.id, updatedEntry)
        .then(updatedPerson => {
          setPersons(persons.map((person) => {
            return person.id === updatedPerson.id ? updatedPerson : person;
          }));
          setNewName('');
          setNewNumber('');
        })
      return;
    }
    const newEntry = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newEntry)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
      });
  }

  const deleteEntryOf = (id) => {
    const deleteConsent = window.confirm(`Delete ${persons.find((person)=>person.id === id).name}?`)
    if(!deleteConsent) return;
    personService
      .deleteEntry(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterStrChange = (event) => {
    setFilterStr(event.target.value);
  }

  const fields = [
    {
      id: 1,
      title: 'name',
      value: newName,
      changeHandler: handleNameChange
    },
    {
      id: 2,
      title: 'number',
      value: newNumber,
      changeHandler: handleNumberChange
    }
  ]

  const filterField = {
    title: 'Search',
    value: filterStr,
    changeHandler: handleFilterStrChange
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm submitHandler={addEntry} fields={fields} />
      <h2>Contacts</h2>
      <InputField field={filterField}/>
      <PersonList persons={personsToShow} deleteEntryOf={deleteEntryOf} />
      
    </div>
  )
}

export default App
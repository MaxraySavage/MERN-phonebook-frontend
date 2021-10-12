import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
import InputField from './components/InputField'
import PersonList from './components/PersonList'

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterStr, setFilterStr ] = useState('');

  const personsToShow = persons.filter((person) => person.name.toLowerCase().indexOf(filterStr.toLowerCase()) !== -1);

  const addEntry = (event) => {
    event.preventDefault();
    if(persons.some((person) => person.name === newName)) {
      alert(`${newName} has already been added to the phonebook`);
      return;
    }
    const newEntry = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newEntry));
    setNewName('');
    setNewNumber('');
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
      <PersonList persons={personsToShow} />
      
    </div>
  )
}

export default App
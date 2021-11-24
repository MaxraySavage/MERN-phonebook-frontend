import './index.css'

import React, { useEffect, useState } from 'react'

import {
  Switch, Route, Link, Redirect
} from "react-router-dom"

import Container from 'react-bootstrap/Container';

import personService from './services/personService'
import loginService from './services/loginService'
import PersonForm from './components/PersonForm'
import InputField from './components/InputField'
import PersonList from './components/PersonList'
import Message from './components/Message'
import LoginForm from './components/LoginForm';
import AppNavBar from './components/AppNavBar';
import { changeHandler } from './helper/helper';
import SignupPage from './pages/SignupPage/SignupPage';
import EditContactPage from './pages/EditContactPage/EditContactPage';


const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterStr, setFilterStr ] = useState('');
  const [ message, setMessage ] = useState(null);
  const [ messageType, setMessageType ] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPhonebookAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      personService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    personService
      .getAll()
      .then( initialPersons => setPersons(initialPersons))
  }, [user]);

  const personsToShow = persons.filter((person) => person.name.toLowerCase().indexOf(filterStr.toLowerCase()) !== -1);

  const displayMessage = (message, type) => {
    setMessage(message);
    setMessageType(type);
    setTimeout(()=>{
      setMessage(null)
    }, 3000);
  }

  const addEntry = (event) => {
    event.preventDefault();
    
    const newEntry = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newEntry)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
        let messageText = `${newPerson.name} successfully added`
        displayMessage(messageText, 'success')
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.log(error)
        const messageText = error.response.data.error
        displayMessage(messageText, 'danger')
      });
  }

  const deleteEntryOf = (id) => {
    const deleteConsent = window.confirm(`Delete ${persons.find((person)=>person.id === id).name}?`)
    if(!deleteConsent) return;
    personService
      .deleteEntry(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      }).catch((error)=>{
        const messageText = error.response.data.error
        displayMessage(messageText, 'danger')
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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const userInfo = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedPhonebookAppUser', JSON.stringify(userInfo)
      ) 
      personService.setToken(userInfo.token)
      setUser(userInfo)
      setUsername('')
      setPassword('')
    } catch (exception) {
      displayMessage('Wrong Credentials', 'danger')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedPhonebookAppUser')
    setUser(null)
    setPersons([])
  }

  const newContactFields = {
    name: {
      id: 1,
      title: 'Name',
      value: newName,
      changeHandler: handleNameChange,
      type: 'text',
      placeholder: 'Enter Contact Name'
    },
    number: {
      id: 2,
      title: 'Number',
      value: newNumber,
      changeHandler: handleNumberChange,
      type: 'text',
      placeholder: 'Enter Phone Number'
    }
  }

  const loginFields = {
    username: {
      title: 'Username',
      value: username,
      changeHandler: changeHandler(setUsername),
      type: 'text',
      placeholder: 'Enter your user name'
    },
    password: {
      title: 'Password',
      value: password,
      changeHandler: changeHandler(setPassword),
      type: 'password',
      placeholder: 'Enter your password'
    }
  }

  const filterField = {
    title: 'Search',
    value: filterStr,
    changeHandler: handleFilterStrChange,
    type: 'text',
  }

  const padding = { padding: 5 }

  return (
    <Container >
        {/* {
          user
          ? <AppNavBar user= {user} />
          : null
        } */}
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/contacts">contacts</Link>
          <Link style={padding} to="/contacts/add">add contacts</Link>
          
          { user && <em>{user.username} logged in</em> 
          }
          {
            user ? <Link style={padding} to="/login" onClick={handleLogout}>logout</Link>
            : <Link style={padding} to="/login">login</Link>
          }
          
    </div>
        <Message message={message} messageType={messageType}/>
        <Switch>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/contacts/edit/:id">
            <EditContactPage personService={personService} displayMessage={displayMessage} persons={persons} setPersons={setPersons}/>
          </Route>
          <Route path="/contacts/add">
          {!user ? <Redirect to="/login" /> : null}
            <PersonForm submitHandler={addEntry} fields={newContactFields} />
          </Route>
          <Route path="/contacts">
          {!user ? <Redirect to="/login" /> : null}
            <h2>Contacts</h2>
            <InputField field={filterField}/>
            <PersonList persons={personsToShow} deleteEntryOf={deleteEntryOf} />
          </Route>
          <Route path="/login">
            <LoginForm submitHandler={handleLogin} fields={loginFields}/>
          </Route>
          <Route path="/">
          {!user 
            ? <Redirect to="/login" /> 
            : <Redirect to="/contacts" />}
          </Route>
        </Switch>
    </Container>
  )
}

export default App
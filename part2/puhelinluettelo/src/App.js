import React, { useState, useEffect } from 'react'
import noteService from './services/notes'
import './index.css'


const Notification = ({errorMessage,successMessage }) => {
  if (errorMessage === null && successMessage === null) {
    return null
  } else if (successMessage !== null) {
    return (
      <div className="success">
        {successMessage}
      </div>
    )
  } else {
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  }

  
}

const Filter = ({ newSearch, onSearchChange }) => {
  
  return (
  <div>
    filter shown with <input value={newSearch} onChange = {onSearchChange} />
  </div>
  )
}


const Persons = ({persons,newSearch,DeleteContact}) => {

  if (newSearch.length > 0){
    const filteredPersons = persons.filter(person =>person.name.toLowerCase().includes(newSearch.toLowerCase()))
    
    return filteredPersons.map(person=> <p key={person.name}>{person.name} {person.number} <button onClick={() =>DeleteContact(person)} >delete</button></p>)

  } else {
    
    return persons.map(person=> <p key={person.name}>{person.name} {person.number}<button onClick={() =>DeleteContact(person)} >delete</button></p>)
  }
}

const Personform = ({addName,newName,newNumber,handleNameChange,handleNumberChange}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input
                value={newName}
                onChange={handleNameChange}
               /><br/>
        number: <input
                value = {newNumber}
                onChange= {handleNumberChange}
                />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )

}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newSearch,SetnewSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage,setsuccessMessage] = useState(null)
  
  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  },[])
  

  const addName = (event) => {
    event.preventDefault()
    
  if (persons.filter(person => person.name === newName).length>0){
      
        const note = persons.find(i => i.name===newName)
        const changedPersons = {...note, number: newNumber}
        const id = note.id

        noteService
        .update(id,changedPersons)
        .then(returnedNote => {
          setPersons(persons.map(note => note.id !== id ? note : returnedNote)) 
          setNewName('')
          setNewNumber('')
          
          setsuccessMessage(`Updated ${note.name}'s contact number!`)
          setTimeout(() => {
            setsuccessMessage(null)
          }, 5000)
          
        })
        .catch(error => {
          
           if (error.response.data.error === undefined){
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            )
           } else {
             setErrorMessage(`${error.response.data.error}`)
           }
            
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
          
          
        })
        
      
    } else if (newName.length===0){
      alert (`Name is required for adding to the phonebook`)
    }
    else
    {

      const newPerson = {
        name: newName,
        number: newNumber
      
      }

      noteService
      .create(newPerson)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setNewName('')
        setNewNumber('')
        setsuccessMessage(`Added ${returnedNote.name} to contacts`)
        
        setTimeout(() => {
          setsuccessMessage(null)
        }, 5000)
      })
      .catch(error => {

        console.log(error.response.data)
        setErrorMessage(`${error.response.data.error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
        
        
      })
    }
  }


  const DeleteContact = (contact) => {
    
    const result = window.confirm (`Delete ${contact.name} ?`)
   
      if (result === true) {

        noteService
        .remove(contact.id)
        .then(response => {
          console.log(response)
          const posts = persons.filter(person => person.name !== contact.name)
          setPersons(posts)
          setsuccessMessage(`Deleted ${contact.name} from contacts!`)
        
          setTimeout(() => {
            setsuccessMessage(null)
          }, 5000)
          
        })
        .catch(error => {
          console.log('failed to delete contact')

          
        })
    }
  }

  
const handleNameChange = (event) => {
   // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) =>{
   // console.log(event.target.value)
    SetnewSearch(event.target.value)
  }

  
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>
      <Filter newsearch={newSearch} onSearchChange = {handleSearchChange}/>
      
      <h1>Add a new</h1>
      <Personform addName = {addName} newName= {newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h1>Numbers</h1>
      <Persons persons={persons} newSearch={newSearch} DeleteContact= {DeleteContact}/>

    </div>
  )

}

export default App
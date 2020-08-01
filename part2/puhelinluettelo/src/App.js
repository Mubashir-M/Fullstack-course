import React, { useState, useEffect } from 'react'
import noteService from './services/notes'




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
      
        alert(`${newName} is already added to phonebook`)
      
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
        SetnewSearch('')
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
          
        })
        .catch(error => {
          console.log('fail')
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
      <h2>Phonebook</h2>
      <Filter newsearch={newSearch} onSearchChange = {handleSearchChange}/>
      
      <h2>Add a new</h2>
      <Personform addName = {addName} newName= {newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} DeleteContact= {DeleteContact}/>

    </div>
  )

}

export default App
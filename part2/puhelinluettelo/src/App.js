import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', 
      number: '045 0454545'},
      {name:'Heliö Taivas',
       number: '0406626623'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber,setNewNumber] = useState('')
  
  

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
        number: newNumber,
      
      }
    
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  


 
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {persons.map(person=> 
      <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )

}

export default App
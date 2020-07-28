import React, {useState,useEffect} from 'react';
import axios from 'axios'

const Filter = ({ newSearch, onSearchChange }) => {
  
  return (
  <div>
    find countries <input value={newSearch} onChange = {onSearchChange} />
  </div>
  )
}

const Country = ({ctry}) => {
  console.log('here is ctry', ctry)
  return (
    <div>
      <h1>{ctry.name}</h1>
      <p>capital: {ctry.capital}</p>
      <p>population: {ctry.population}</p>
      <h2>Languages</h2>
      {ctry.languages.map(language => <li key = {language.name}>{language.name}</li>)}<br/>
      <img src={ctry.flag} alt='country flag' width='160' height='130'></img>
    </div>
  )
}



const Countries = ({newSearch,countries, onSearchChange}) => {
  const filteredCountries = countries.filter (country => country.name.toLowerCase().includes(newSearch.toLowerCase()))
  if (newSearch.length > 0 && filteredCountries.length<10){
    
    if (filteredCountries.length === 1) {
      return <Country ctry = {filteredCountries[0]}/>
    } else {
      return filteredCountries.map(ctry => <p key={ctry.name}>{ctry.name} <button key = {ctry.name} onClick = {onSearchChange} value={ctry.name}>Show</button></p>)
    }
  } else {
    return <p>Too many matches, specify another filter</p>
  }
}

const App =() => {
  const [countries,SetCountries] = useState([])
  const [newSearch,SetnewSearch] = useState('')
  
  const handleSearchChange = (event) =>{
    console.log(event.target.value)
    SetnewSearch(event.target.value)
   
  }


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        SetCountries(response.data)
      })
  },[])
  
  
  return (
    <div >
        <Filter newSearch= {newSearch} onSearchChange= {handleSearchChange}/>
        <Countries newSearch = {newSearch} countries = {countries} onSearchChange={handleSearchChange}/>
    </div>
  );
}

export default App;

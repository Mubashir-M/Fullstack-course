import React, {useState,useEffect} from 'react';
import axios from 'axios'

const Filter = ({ newSearch, onSearchChange }) => {
  
  return (
  <div>
    filter shown with <input value={newSearch} onChange = {onSearchChange} />
  </div>
  )
}

const Country = ({ctry}) => {
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

const Countries = ({newSearch,countries}) => {
  if (newSearch.length > 0){
    const filteredCountries = countries.filter (coutnry => coutnry.name.toLowerCase().includes(newSearch.toLowerCase()))
    if (filteredCountries.length > 10){ 
      return <p>Too many matches, specify another filter</p> 
    } else if (filteredCountries.length === 1) {
     return <Country ctry = {filteredCountries[0]}/>
    }
    return filteredCountries.map(country=> <p key={country.name}>{country.name}</p>)
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
     <h1>Testing</h1>
        <Filter newSearch= {newSearch} onSearchChange= {handleSearchChange}/>
        <Countries newSearch = {newSearch} countries = {countries}/>
    </div>
  );
}

export default App;

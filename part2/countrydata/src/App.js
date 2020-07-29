import React, {useState,useEffect} from 'react';
import axios from 'axios'

const Filter = ({ newSearch, onSearchChange }) => {
  
  return (
  <div>
    find countries <input value={newSearch} onChange = {onSearchChange} />
  </div>
  )
}

const Weather = ({capital}) => {
  const [weather,SetWeather] = useState({location:{}, current: {}})
  const api_key= process.env.REACT_APP_API_KEY
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
  
  useEffect(() => {
    console.log('weather data')
    axios
      .get(url)
      .then(response => {
        console.log('promise fulfilled')
        SetWeather(response.data)
      })
  },[url])

  const current=weather.current
    return(
      <div>
        <h2>Weather in {weather.location.name}</h2>
        <p> <b>temperature: </b>{current.temperature} Celcius</p>
        <img src={current.weather_icons} alt='weather icon' width='110' height='90'></img>
        <p> <b>Wind: </b>{current.wind_speed} mph direction {current.wind_dir}</p>
      </div>
      
      
    )


}

const Country = ({ctry}) => {
  
  return (
    <div>
      <h1>{ctry.name}</h1>
      <p>capital: {ctry.capital}</p>
      <p>population: {ctry.population}</p>
      <h2>Spoken languages</h2>
      {ctry.languages.map(language => <li key = {language.name}>{language.name}</li>)}<br/>
      <img src={ctry.flag} alt='country flag' width='160' height='130'></img>
      <Weather capital={ctry.capital}/>
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

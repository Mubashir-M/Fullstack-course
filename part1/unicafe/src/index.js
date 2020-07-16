
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Reusable individual statistic button
const Statistic = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.attribute}</td>
        <td> {props.value} {props.sign}</td>
      </tr>
      </tbody>
  )
}

// Reusable button function
const Button= (props) =>{
  
  return (
    <button onClick= {props.function} >{props.text}</button>
    )
}


// All given statistics
const Statistics = (props) => {

  const {good,neutral,bad,all}= props
  var avg = (good-bad)/all
  var positive = 100*good/all

  if (good===0 && neutral === 0 && bad ===0){
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
  <div>
    <h1>statistics</h1>
    <table>
      <Statistic attribute= 'good' value = {good} />
      <Statistic attribute= 'neutral' value = {neutral} />
      <Statistic attribute= 'bad' value = {bad} />
      <Statistic attribute= 'all' value = {all} />
      <Statistic attribute= 'average' value = {avg} />
      <Statistic attribute= 'positive' value = {positive} sign= {'%'}/>
    </table>
  </div>  
  )  
}

// application in the root App component
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

 

  return (
    <div>
      <h1>give feedback</h1>
      <Button function={()=>setGood(good+1)} text = 'good' />
      <Button function={()=>setNeutral(neutral+1)} text = 'neutral' />
      <Button function={()=>setBad(bad+1)} text = 'bad' />
      
      <Statistics good={good} neutral={neutral} bad= {bad} all={good+neutral+bad}/>

      
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

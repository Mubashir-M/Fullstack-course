
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
  return (
    <div>
      {props.attribute} {props.value}
    </div>
  )
}

const Statistics = (props) => {

  const {good,neutral,bad,all}= props

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
    <Part attribute= 'good' value = {good} />
    <Part attribute= 'neutral' value = {neutral} />
    <Part attribute= 'bad' value = {bad} />
    <Part attribute= 'all' value = {all} />
    <p>average {(good-bad)/all}</p>
    <p>positive {100*good/all} %</p>
  </div>  
  )  
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

 

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={()=>setGood(good+1)}>good</button>
      <button onClick={()=>setNeutral(neutral+1)}>neutral</button>
      <button onClick={()=>setBad(bad+1)}>bad</button>
      
      <Statistics good={good} neutral={neutral} bad= {bad} all={good+neutral+bad}/>

      
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

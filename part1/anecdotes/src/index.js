import React, { useState } from 'react'
import ReactDOM from 'react-dom'

////////////
const Random = () =>{
  return Math.floor(Math.random()*6)
}



///////////////////
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState([0,0,0,0,0,0])
  const [maxVoteIndex,setIndex] = useState(0)
  const [maxVotes,setMax] = useState ([0])
  console.log(votes)
  
  const Increment = () => {
    console.log('selected ',selected)
    let copy = [...votes]
    copy[selected]+=1
    setVotes(copy)

    if (copy[selected]>maxVotes){
      setMax(copy[selected])
      setIndex(selected)
    }
  }
  
  
  
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p> {props.anecdotes[selected]} <br/>has {votes[selected]} votes</p>
      <div>
      
      <button onClick = {()=>setSelected(Random)}>next anecdote</button>
      <button onClick = {Increment} >vote</button>
      
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[maxVoteIndex]} <br/>has {votes[maxVoteIndex]} votes</p>
      

      </div>   
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
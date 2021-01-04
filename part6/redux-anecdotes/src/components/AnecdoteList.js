import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  
  
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch (voteAnecdote(anecdote.id))
  }
  return (
    <div>
      {anecdotes.sort((anecdote1,anecdote2) => anecdote2.votes-anecdote1.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={ () => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}



export default AnecdoteList



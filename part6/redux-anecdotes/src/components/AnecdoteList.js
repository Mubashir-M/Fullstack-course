import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  
  
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch (voteAnecdote(anecdote.id))
    dispatch(setNotification(`Voted for the anecdote: ${anecdote.content}`, 5))
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


